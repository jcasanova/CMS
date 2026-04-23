import type { SectionHeadingBlock } from "@/lib/strapi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function SectionHeadingBlockView({ block }: { block: SectionHeadingBlock }) {
  const centered = block.align === "center";
  const hasCtas =
    (block.primaryCtaLabel && block.primaryCtaHref) ||
    (block.secondaryCtaLabel && block.secondaryCtaHref);

  return (
    <header className={cn(centered && "mx-auto max-w-3xl text-center")}>
      {block.eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {block.eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
        {block.heading}
      </h2>
      {block.subheading && (
        <p className="mt-3 text-base leading-relaxed text-ink-500 md:text-lg">
          {block.subheading}
        </p>
      )}
      {hasCtas && (
        <div className={cn("mt-6 flex flex-wrap gap-3", centered && "justify-center")}>
          {block.primaryCtaLabel && block.primaryCtaHref && (
            <Button href={block.primaryCtaHref} size="lg">
              {block.primaryCtaLabel}
            </Button>
          )}
          {block.secondaryCtaLabel && block.secondaryCtaHref && (
            <Button href={block.secondaryCtaHref} variant="ghost" size="lg">
              {block.secondaryCtaLabel}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
