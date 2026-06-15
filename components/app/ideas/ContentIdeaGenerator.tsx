"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Play,
  Save,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import {
  generateContentIdeasAction,
  saveGeneratedIdeasAction,
} from "@/actions/content-ideas";
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
  "h-11 w-full rounded-2xl border border-[#DDE6EC] bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100";

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

function getConfidenceLabel(confidence: AIContentIdeaConfidence) {
  if (confidence === "high") return "Tự tin cao";
  if (confidence === "medium") return "Tự tin vừa";
  return "Cần bổ sung dữ liệu";
}

function normalizeCount(value: number) {
  if (value === 3 || value === 5 || value === 10) {
    return value;
  }

  return 3;
}

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
  const [confidence, setConfidence] = useState<AIContentIdeaConfidence>("low");
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
        count: normalizeCount(count),
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
      setIdeas([]);
      setSelectedIndexes([]);
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

    if (!channelId) {
      setMessage({
        type: "warning",
        text: "Vui lòng chọn kênh trước khi lưu ý tưởng.",
      });
      return;
    }

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

  function selectAllIdeas() {
    setSelectedIndexes(ideas.map((_, index) => index));
  }

  function clearSelectedIdeas() {
    setSelectedIndexes([]);
  }

  return (
    <section className="grid items-start gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <SlidersHorizontal className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
              Thiết lập tạo ý tưởng
            </h2>
            <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
              Chọn kênh, sản phẩm và mục tiêu để AI tạo ý tưởng phù hợp.
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
              className={`${inputClassName} cursor-pointer`}
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
              className={`${inputClassName} cursor-pointer`}
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
                className={`${inputClassName} cursor-pointer`}
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
                className={`${inputClassName} cursor-pointer`}
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
              onChange={(event) =>
                setGoal(event.target.value as ContentIdeaGoal)
              }
              className={`${inputClassName} cursor-pointer`}
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
            className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-emerald-600 disabled:hover:shadow-[0_14px_34px_rgba(16,185,129,0.22)] disabled:active:scale-100"
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

          {message ? <FeedbackNotice message={message} /> : null}
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6">
        <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Sparkles className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">
                Preview ý tưởng
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                Kiểm tra và chọn ý tưởng phù hợp trước khi lưu vào thư viện.
              </p>
            </div>
          </div>

          {ideas.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                {ideas.length} ý tưởng
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-500">
                {getConfidenceLabel(confidence)}
              </span>
            </div>
          ) : null}
        </div>

        {ideas.length === 0 ? (
          <div className="mt-5 flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-dashed border-emerald-200 bg-emerald-50/45 px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-emerald-100">
              <Sparkles className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-xl font-black tracking-[-0.03em] text-slate-950">
              Chưa có preview
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-7 text-slate-500">
              Sau khi bấm tạo ý tưởng, AI sẽ hiển thị danh sách ý tưởng tại đây
              để bạn chọn trước khi lưu.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold text-slate-500">
                Đã chọn{" "}
                <span className="font-black text-emerald-700">
                  {selectedIdeas.length}
                </span>{" "}
                / {ideas.length} ý tưởng
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={selectAllIdeas}
                  className="inline-flex h-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
                >
                  Chọn tất cả
                </button>

                <button
                  type="button"
                  onClick={clearSelectedIdeas}
                  className="inline-flex h-9 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-600 transition-all duration-200 ease-out hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98]"
                >
                  Bỏ chọn
                </button>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {ideas.map((idea, index) => {
                const isSelected = selectedIndexes.includes(index);

                return (
                  <label
                    key={`${idea.title}-${index}`}
                    className={[
                      "block rounded-[22px] border p-4 transition-all duration-200 ease-out",
                      "cursor-pointer hover:border-emerald-200 hover:bg-emerald-50/35 active:scale-[0.99]",
                      isSelected
                        ? "border-emerald-200 bg-emerald-50/45 ring-1 ring-emerald-100"
                        : "border-slate-200 bg-slate-50/60",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleIdea(index)}
                        className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-emerald-700 ring-1 ring-emerald-100">
                            {idea.platform}
                          </span>
                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-extrabold text-slate-500 ring-1 ring-slate-100">
                            {idea.content_format || "Video ngắn"}
                          </span>
                        </div>

                        <h4 className="mt-3 line-clamp-2 text-sm font-black leading-6 text-slate-950">
                          {idea.title}
                        </h4>

                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-600">
                          {idea.hook}
                        </p>

                        <div className="mt-3 rounded-2xl border border-slate-100 bg-white/75 p-3">
                          <p className="text-xs font-extrabold text-slate-400">
                            Vì sao phù hợp
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-slate-500">
                            {idea.ai_reason ||
                              "AI đề xuất dựa trên dữ liệu kênh."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleSaveSelected}
              disabled={isSaving || selectedIdeas.length === 0}
              className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(16,185,129,0.22)] transition-all duration-200 ease-out hover:bg-emerald-700 hover:shadow-[0_18px_42px_rgba(16,185,129,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-emerald-600 disabled:hover:shadow-[0_14px_34px_rgba(16,185,129,0.22)] disabled:active:scale-100"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Lưu ý tưởng đã chọn ({selectedIdeas.length})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
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

function FeedbackNotice({ message }: { message: FeedbackMessage }) {
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
