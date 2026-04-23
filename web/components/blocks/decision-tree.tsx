import Link from "next/link";
import type { DecisionTreeBlock } from "@/lib/strapi";
import { strapiMedia } from "@/lib/strapi";

export function DecisionTreeBlockView({ block }: { block: DecisionTreeBlock }) {
  const diagram = strapiMedia(block.diagram?.url);
  return (
    <section className="space-y-8">
      {(block.heading || block.intro) && (
        <header className="max-w-3xl">
          {block.heading && (
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-900 md:text-4xl">
              {block.heading}
            </h2>
          )}
          {block.intro && (
            <p className="mt-3 text-base leading-relaxed text-ink-500">{block.intro}</p>
          )}
        </header>
      )}

      {diagram && (
        <figure className="overflow-hidden rounded-2xl border border-paper-border bg-paper-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={diagram} alt={block.diagramAlt ?? ""} className="h-auto w-full" />
        </figure>
      )}

      <ol className="space-y-4">
        {block.steps.map((step, i) => (
          <li
            key={step.id}
            className="overflow-hidden rounded-2xl border border-paper-border bg-paper"
          >
            <div className="flex flex-col gap-0">
              <div className="border-b border-paper-border bg-paper-muted/60 px-6 py-4">
                <div className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold text-ink-900">
                      {step.question}
                    </h3>
                    {step.description && (
                      <p className="mt-1 text-sm text-ink-500">{step.description}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-px bg-paper-border md:grid-cols-2">
                <Outcome label="Yes" outcome={step.yesOutcome} href={step.yesLink} tone="yes" />
                <Outcome label="No" outcome={step.noOutcome} href={step.noLink} tone="no" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Outcome({
  label,
  outcome,
  href,
  tone,
}: {
  label: string;
  outcome: string;
  href?: string | null;
  tone: "yes" | "no";
}) {
  const toneClass =
    tone === "yes"
      ? "text-brand-700 bg-brand-50"
      : "text-ink-700 bg-paper";
  const Wrapper: React.ElementType = href ? Link : "div";
  return (
    <Wrapper
      {...(href ? { href } : {})}
      className={`flex h-full flex-col gap-1 px-6 py-4 transition-colors ${toneClass} ${href ? "hover:bg-brand-100" : ""}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      <span className="text-sm leading-relaxed">{outcome}</span>
      {href && (
        <span className="mt-1 text-sm font-medium text-brand-600">Continue →</span>
      )}
    </Wrapper>
  );
}
