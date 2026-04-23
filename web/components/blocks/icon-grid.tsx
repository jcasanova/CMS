import type { IconGridBlock } from "@/lib/strapi";
import { strapiMedia } from "@/lib/strapi";
import { cn } from "@/lib/cn";

const cols: Record<IconGridBlock["columns"], string> = {
  "3": "grid-cols-2 sm:grid-cols-3",
  "4": "grid-cols-2 sm:grid-cols-4",
  "5": "grid-cols-2 sm:grid-cols-3 md:grid-cols-5",
  "6": "grid-cols-3 sm:grid-cols-4 md:grid-cols-6",
  "8": "grid-cols-4 sm:grid-cols-6 md:grid-cols-8",
};

export function IconGridBlockView({ block }: { block: IconGridBlock }) {
  return (
    <section>
      {(block.heading || block.description) && (
        <header className="mb-6 max-w-2xl">
          {block.heading && (
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
              {block.heading}
            </h2>
          )}
          {block.description && (
            <p className="mt-2 text-sm text-ink-500">{block.description}</p>
          )}
        </header>
      )}

      <ul className={cn("grid gap-3", cols[block.columns])}>
        {block.icons.map((icon) => {
          const src = strapiMedia(icon.iconImage?.url);
          return (
            <li
              key={icon.id}
              className="group flex flex-col items-center gap-2 rounded-xl border border-paper-border bg-paper p-3 text-center transition-colors hover:border-brand-300 hover:bg-brand-50/40"
              title={icon.keywords ?? undefined}
            >
              <div className="grid size-10 place-items-center rounded-lg bg-paper-muted text-ink-700 transition-colors group-hover:bg-brand-100 group-hover:text-brand-700">
                {src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt="" className="size-6" />
                ) : (
                  <span className="font-mono text-[10px]">{(icon.iconName ?? icon.name).slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <span className="truncate text-xs text-ink-700">{icon.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
