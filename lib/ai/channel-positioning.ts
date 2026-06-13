import { buildChannelPositioningPrompt } from "@/lib/ai/prompts/channel-positioning";
import { normalizeAIChannelPositioningResult } from "@/lib/ai/schemas/channel-positioning";
import type {
  AIChannelPositioningInput,
  AIChannelPositioningRunResult,
} from "@/types/ai-channel-positioning";

type OpenAIChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

type GeminiGenerateContentResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function extractJsonObject(text: string) {
  const trimmed = text.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("AI không trả về JSON hợp lệ.");
  }

  return trimmed.slice(firstBrace, lastBrace + 1);
}

async function runOpenAI(input: AIChannelPositioningInput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing.");
  }

  const { system, user } = buildChannelPositioningPrompt(input);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.35,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI channel positioning failed: HTTP ${response.status}`);
  }

  const data = (await response.json()) as OpenAIChatCompletionResponse;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI không trả về nội dung.");
  }

  const parsed = JSON.parse(extractJsonObject(content));
  const result = normalizeAIChannelPositioningResult(parsed);

  if (!result) {
    throw new Error("OpenAI trả về dữ liệu định vị không đúng định dạng.");
  }

  return result;
}

async function runGemini(input: AIChannelPositioningInput) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const { system, user } = buildChannelPositioningPrompt(input);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${system}\n\n${user}` }],
          },
        ],
        generationConfig: {
          temperature: 0.35,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini channel positioning failed: HTTP ${response.status}`);
  }

  const data = (await response.json()) as GeminiGenerateContentResponse;
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!content) {
    throw new Error("Gemini không trả về nội dung.");
  }

  const parsed = JSON.parse(extractJsonObject(content));
  const result = normalizeAIChannelPositioningResult(parsed);

  if (!result) {
    throw new Error("Gemini trả về dữ liệu định vị không đúng định dạng.");
  }

  return result;
}

export async function generateChannelPositioningWithAI(
  input: AIChannelPositioningInput,
): Promise<AIChannelPositioningRunResult> {
  const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);

  if (!hasOpenAIKey && !hasGeminiKey) {
    return {
      status: "missing_key",
      message:
        "Chưa cấu hình AI API key. Bạn vẫn có thể hoàn thiện hồ sơ kênh thủ công.",
    };
  }

  if (hasOpenAIKey) {
    try {
      const result = await runOpenAI(input);

      return {
        status: "succeeded",
        message: "AI đã tạo định vị kênh. Vui lòng kiểm tra trước khi dùng.",
        result,
        provider: "openai",
      };
    } catch (error) {
      console.error("OpenAI channel positioning failed:", error);
    }
  }

  if (hasGeminiKey) {
    try {
      const result = await runGemini(input);

      return {
        status: "succeeded",
        message: "AI đã tạo định vị kênh. Vui lòng kiểm tra trước khi dùng.",
        result,
        provider: "gemini",
      };
    } catch (error) {
      console.error("Gemini channel positioning failed:", error);
    }
  }

  return {
    status: "failed",
    message:
      "AI chưa thể tạo định vị lúc này. Bạn vẫn có thể tiếp tục chỉnh hồ sơ thủ công.",
  };
}