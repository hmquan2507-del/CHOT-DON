import ContentIdeaCard from "./ContentIdeaCard";
import ContentIdeasEmptyState from "./ContentIdeasEmptyState";
import type {
  ContentIdea,
  ContentIdeaChannelOption,
  ContentIdeaProductOption,
} from "@/types/content-idea";

type ContentIdeasListProps = {
  ideas: ContentIdea[];
  channels: ContentIdeaChannelOption[];
  products: ContentIdeaProductOption[];
};

export default function ContentIdeasList({
  ideas,
  channels,
  products,
}: ContentIdeasListProps) {
  if (ideas.length === 0) {
    return <ContentIdeasEmptyState />;
  }

  const channelMap = new Map(channels.map((channel) => [channel.id, channel]));
  const productMap = new Map(products.map((product) => [product.id, product]));

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      {ideas.map((idea) => (
        <ContentIdeaCard
          key={idea.id}
          idea={idea}
          channelName={channelMap.get(idea.channel_id)?.name}
          productName={
            idea.product_id ? productMap.get(idea.product_id)?.name : undefined
          }
        />
      ))}
    </section>
  );
}