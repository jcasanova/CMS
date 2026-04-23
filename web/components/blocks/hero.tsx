import type { HeroBlock } from "@/lib/strapi";
import { strapiMedia } from "@/lib/strapi";
import { Button } from "@/components/ui/button";

export function HeroBlockView({ block }: { block: HeroBlock }) {
  const bg = strapiMedia(block.backgroundImage?.url);
  return (
    <section className="relative isolate overflow-hidden rounded-3xl text-white">
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,theme(colors.brand.900),theme(colors.brand.600)_60%,theme(colors.brand.400))]"
        style={
          bg
            ? { backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      />
      {bg && <div className="absolute inset-0 -z-10 bg-black/20" />}

      <div className="flex min-h-[420px] flex-col justify-end px-10 py-16 md:px-16 md:py-20">
        {block.eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            {block.eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {block.title}
        </h1>
        {block.subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/90 md:text-lg">
            {block.subtitle}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {block.primaryCtaLabel && block.primaryCtaHref && (
              <Button href={block.primaryCtaHref} variant="light" size="lg">
                {block.primaryCtaLabel}
              </Button>
            )}
            {block.secondaryCtaLabel && block.secondaryCtaHref && (
              <Button href={block.secondaryCtaHref} variant="outline" size="lg">
                {block.secondaryCtaLabel}
              </Button>
            )}
          </div>
          <div className="text-right text-xs text-white/80">
            {block.meta && <div>{block.meta}</div>}
            {block.version && <div className="mt-1 opacity-80">{block.version}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
