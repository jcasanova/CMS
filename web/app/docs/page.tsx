import Link from "next/link";
import { listSections } from "@/lib/strapi";

export const metadata = {
  title: "Documentation",
  description: "Hue Design System — guides, components, theming, and updates.",
};

export default async function DocsIndexPage() {
  const sections = await safe(() => listSections());

  return (
    <article className="space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
          Hue Design System
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
          Documentation
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-500">
          Start with the Welcome section, then dive into variables, components,
          icons, and theming.
        </p>
      </header>

      {sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-paper-border bg-paper-muted/40 p-8 text-sm text-ink-500">
          <p className="font-medium text-ink-900">No content yet.</p>
          <p className="mt-1">
            Start Strapi (<code className="font-mono">npm run develop</code> at
            the repo root), sign into the admin, and create at least one{" "}
            <strong>Section</strong> and one <strong>Doc Page</strong>.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-paper-border p-6"
            >
              <h2 className="font-display text-xl font-semibold text-ink-900">
                {section.name}
              </h2>
              {section.description && (
                <p className="mt-1.5 text-sm text-ink-500">{section.description}</p>
              )}
              <ul className="mt-4 space-y-1 text-sm">
                {section.docPages?.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/docs/${section.slug}/${p.slug}`}
                      className="text-ink-700 hover:text-brand-600"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

async function safe<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn();
  } catch {
    return [];
  }
}
