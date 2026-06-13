"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import {
  generateContentIdeasAction,
  saveGeneratedIdeasAction,
} from "@/actions/content-ideas";
import ContentIdeaSaveButton from "./ContentIdeaSaveButton";
import type {
  ContentIdeaChannelOption,
  ContentIdeaGoal,
  ContentIdeaPlatform,
  ContentIdeaProductOption,
} from "@/types/content-idea";
import type {
  AIContentIdea,
  AIContentIdeaConfidence,
} from "@/types/ai-content-ideas";

type ContentIdeaGeneratorProps = {
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
};

type FeedbackMessage = {
  type: "success" | "warning" | "error";
  text: string;
};
const inputClassName =
  "h-11 w-full rounded-2xl border border-[#DDE6EC] bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100/50 hover:border-slate-300";

const goals: ContentIdeaGoal[] = [
  "Bán hàng",
  "Affiliate",
  "Tăng nhận diện",
  "Tăng tương tác",
  "Giáo dục khách hàng",
];

const platforms: ContentIdeaPlatform[] = [
  "TikTok",
  "YouTube Shorts",
  "Facebook Reels",
];

export default function ContentIdeaGenerator({
  channels,
  products,
}: ContentIdeaGeneratorProps) {
    const router = useRouter();
  const [channelId, setChannelId] = useState(channels[0]?.id ?? "");
  const [productId, setProductId] = useState("");
  const [platform, setPlatform] = useState<ContentIdeaPlatform>("TikTok");
  const [goal, setGoal] = useState<ContentIdeaGoal>("Bán hàng");
  const [count, setCount] = useState(3);
  const [ideas, setIdeas] = useState<AIContentIdea[]>([]);
  const [confidence, setConfidence] =
    useState<AIContentIdeaConfidence>("low");
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  const visibleProducts = useMemo(() => {
    if (!channelId) {
      return products;
    }

    return products.filter((product) => {
      return product.channel_id === channelId || product.channel_id === null;
    });
  }, [channelId, products]);

  const selectedIdeas = selectedIndexes
    .map((index) => ideas[index])
    .filter(Boolean);

  async function handleGenerate() {
    setMessage(null);

    if (!channelId) {
      setMessage({
        type: "warning",
        text: "Vui lòng tạo hoặc chọn hồ sơ kênh trước.",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateContentIdeasAction({
        channelId,
        productId: productId || null,
        platform,
        goal,
        count,
      });

      if (!result.success || !result.result) {
        setIdeas([]);
        setSelectedIndexes([]);
        setMessage({
          type: "warning",
          text: result.message,
        });
        return;
      }

      setIdeas(result.result.ideas);
      setConfidence(result.result.confidence);
      setSelectedIndexes(result.result.ideas.map((_, index) => index));
      setMessage({
        type: "success",
        text: result.message,
      });
    } catch {
      setMessage({
        type: "error",
        text: "Không thể tạo ý tưởng lúc này. Vui lòng thử lại sau.",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSaveSelected() {
    setMessage(null);

    if (selectedIdeas.length === 0) {
      setMessage({
        type: "warning",
        text: "Vui lòng chọn ít nhất một ý tưởng để lưu.",
      });
      return;
    }

    setIsSaving(true);

    try {
      const result = await saveGeneratedIdeasAction({
        channelId,
        productId: productId || null,
        ideas: selectedIdeas,
        confidence,
      });

      setMessage({
        type: result.success ? "success" : "warning",
        text: result.message,
      });
if (result.success) {
  setIdeas([]);
  setSelectedIndexes([]);
  router.refresh();
}
    } catch {
      setMessage({
        type: "error",
        text: "Không thể lưu ý tưởng. Vui lòng thử lại.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function toggleIdea(index: number) {
    setSelectedIndexes((current) => {
      if (current.includes(index)) {
        return current.filter((item) => item !== index);
      }

      return [...current, index];
    });
  }

  return (
    <aside className="sticky top-6 rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Sparkles className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
            AI tạo ý tưởng
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
            Chọn kênh, sản phẩm và mục tiêu để tạo ý tưởng video ngắn.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <Field label="Kênh">
          <select
            value={channelId}
            onChange={(event) => {
              setChannelId(event.target.value);
              setProductId("");
            }}
            className={inputClassName}
          >
            {channels.length === 0 ? (
              <option value="">Chưa có hồ sơ kênh</option>
            ) : (
              channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                  {channel.platform ? ` (${channel.platform})` : ""}
                </option>
              ))
            )}
          </select>
        </Field>

        <Field label="Sản phẩm">
          <select
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            className={inputClassName}
          >
            <option value="">Không chọn sản phẩm cụ thể</option>
            {visibleProducts.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
                {product.priority === "high" ? " ⭐" : ""}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nền tảng">
            <select
              value={platform}
              onChange={(event) =>
                setPlatform(event.target.value as ContentIdeaPlatform)
              }
              className={inputClassName}
            >
              {platforms.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Số ý tưởng">
            <select
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className={inputClassName}
            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </Field>
        </div>

        <Field label="Mục tiêu">
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value as ContentIdeaGoal)}
            className={inputClassName}
          >
            {goals.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating || channels.length === 0}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              AI đang tạo ý tưởng...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Tạo ý tưởng bằng AI
            </>
          )}
        </button>

        {message ? <FeedbackMessage message={message} /> : null}
      </div>

      {ideas.length > 0 ? (
        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-950">
                Ý tưởng vừa tạo
              </h3>
              <p className="mt-1 text-xs font-semibold text-slate-400">
                Confidence: {confidence}
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
              {ideas.length} ý tưởng
            </span>
          </div>

          <div className="space-y-3">
            {ideas.map((idea, index) => (
              <label
                key={`${idea.title}-${index}`}
                className="block cursor-pointer rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIndexes.includes(index)}
                    onChange={() => toggleIdea(index)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600"
                  />

                  <div className="min-w-0">
                    <h4 className="text-sm font-black leading-5 text-slate-950">
                      {idea.title}
                    </h4>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                      {idea.hook}
                    </p>
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                      {idea.ai_reason}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
<div className="mt-4">
  <ContentIdeaSaveButton
    selectedCount={selectedIdeas.length}
    pending={isSaving}
    onClick={handleSaveSelected}
  />
</div>
        </div>
      ) : null}
    </aside>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-extrabold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function FeedbackMessage({ message }: { message: FeedbackMessage }) {
  const className =
    message.type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : message.type === "warning"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-red-200 bg-red-50 text-red-600";

  return (
    <div
      className={`flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold leading-6 ${className}`}
    >
      {message.type === "success" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{message.text}</span>
    </div>
  );
}