import type { ImageBlock } from "@/lib/strapi";
import { strapiMedia } from "@/lib/strapi";
import { cn } from "@/lib/cn";

const widths: Record<NonNullable<ImageBlock["width"]>, string> = {
  content: "max-w-3xl mx-auto",
  wide: "max-w-5xl mx-auto",
  full: "w-full",
};

export function ImageBlockView({ block }: { block: ImageBlock }) {
  const src = strapiMedia(block.image.url);
  if (!src) return null;
  const size = widths[block.width ?? "content"];
  return (
    <figure className={cn(size)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={block.alt}
        width={block.image.width}
        height={block.image.height}
        className="h-auto w-full rounded-xl border border-paper-border"
      />
      {block.caption && (
        <figcaption className="mt-2 text-center text-sm text-ink-500">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
