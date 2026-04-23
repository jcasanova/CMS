import Link from "next/link";
import type { FeatureGridBlock } from "@/lib/strapi";
import { strapiMedia } from "@/lib/strapi";
import { cn } from "@/lib/cn";

const cols: Record<FeatureGridBlock["columns"], string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "md:grid-cols-2 lg:grid-cols-4",
};

export function FeatureGridBlockView({ block }: { block: FeatureGridBlock }) {
  return (
    <section>
      {(block.heading || block.subheading) && (
        <div className="mb-10 max-w-2xl">
          {block.heading && (
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              {block.heading}
            </h2>
          )}
          {block.subheading && (
            <p className="mt-3 text-base leading-relaxed text-ink-500">{block.subheading}</p>
          )}
        </div>
      )}

      <ul className={cn("grid grid-cols-1 gap-4", cols[block.columns])}>
        {block.features.map((feature) => {
          const iconUrl = strapiMedia(feature.iconImage?.url);
          const Wrapper: React.ElementType = feature.link ? Link : "div";
          return (
            <li key={feature.id} className="list-none">
              <Wrapper
                {...(feature.link ? { href: feature.link } : {})}
                className="group flex h-full flex-col rounded-2xl border border-paper-border bg-paper p-6 transition-colors hover:border-brand-300 hover:bg-brand-50/50"
              >
                <div className="mb-4 grid size-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                  {iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={iconUrl} alt="" className="size-6" />
                  ) : feature.iconName ? (
                    <span aria-hidden>{feature.iconName.slice(0, 2).toUpperCase()}</span>
                  ) : (
                    <span aria-hidden>◆</span>
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  {feature.description}
                </p>
                {feature.link && (
                  <span className="mt-auto pt-4 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more →
                  </span>
                )}
              </Wrapper>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
