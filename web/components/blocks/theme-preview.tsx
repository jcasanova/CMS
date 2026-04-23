import type { ThemePreviewBlock } from "@/lib/strapi";
import { strapiMedia } from "@/lib/strapi";

function isLight(hex: string): boolean {
  const h = hex.replace("#", "");
  if (h.length !== 6 && h.length !== 8) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Rec. 709 luminance
  const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return l > 0.65;
}

export function ThemePreviewBlockView({ block }: { block: ThemePreviewBlock }) {
  const light = strapiMedia(block.lightPreview?.url);
  const dark = strapiMedia(block.darkPreview?.url);

  return (
    <section className="space-y-8">
      <header>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
          {block.name}
        </h2>
        {block.description && (
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-500">
            {block.description}
          </p>
        )}
      </header>

      {(light || dark) && (
        <div className="grid gap-4 md:grid-cols-2">
          {light && (
            <figure className="overflow-hidden rounded-xl border border-paper-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={light} alt={`${block.name} — light preview`} className="h-auto w-full" />
              <figcaption className="border-t border-paper-border bg-paper-muted/60 px-3 py-2 text-xs text-ink-500">Light</figcaption>
            </figure>
          )}
          {dark && (
            <figure className="overflow-hidden rounded-xl border border-paper-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dark} alt={`${block.name} — dark preview`} className="h-auto w-full" />
              <figcaption className="border-t border-paper-border bg-paper-muted/60 px-3 py-2 text-xs text-ink-500">Dark</figcaption>
            </figure>
          )}
        </div>
      )}

      {block.swatches && block.swatches.length > 0 && (
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">
            Palette
          </h3>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {block.swatches.map((s) => {
              const textColor = isLight(s.hex) ? "text-ink-900" : "text-white";
              return (
                <li
                  key={s.id}
                  className={`flex h-32 flex-col justify-between rounded-xl p-3 ring-1 ring-inset ring-black/10 ${textColor}`}
                  style={{ backgroundColor: s.hex }}
                >
                  <span className="text-xs font-medium opacity-80">
                    {s.role ?? ""}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{s.name}</div>
                    {s.token && (
                      <div className="text-[11px] opacity-75 font-mono">{s.token}</div>
                    )}
                    <div className="text-[11px] opacity-80 font-mono">{s.hex.toUpperCase()}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {block.cssVariables && (
        <figure className="overflow-hidden rounded-xl border border-paper-border bg-ink-900 text-paper">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-paper/70">
            <span className="font-mono">theme.css</span>
            <span className="uppercase tracking-wider">CSS</span>
          </header>
          <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed">
            <code>{block.cssVariables}</code>
          </pre>
        </figure>
      )}
    </section>
  );
}
