import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { listSections } from "@/lib/strapi";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sections = await safeListSections();

  return (
    <>
      <SiteNav variant="solid" />
      <div className="pt-24">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-6 py-10 md:grid-cols-[240px_1fr]">
          <aside className="md:sticky md:top-28 md:self-start">
            <nav aria-label="Documentation" className="space-y-6 text-sm">
              <Link
                href="/docs"
                className="block font-display text-base font-semibold text-ink-900 hover:text-brand-600"
              >
                Documentation
              </Link>
              {sections.length === 0 && (
                <p className="text-ink-500">
                  No sections yet. Create a <code className="font-mono">Section</code> in Strapi
                  to populate this sidebar.
                </p>
              )}
              {sections.map((section) => (
                <div key={section.id}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
                    {section.name}
                  </p>
                  <ul className="space-y-1">
                    {section.docPages?.map((page) => (
                      <li key={page.id}>
                        <Link
                          href={`/docs/${section.slug}/${page.slug}`}
                          className="block rounded-md px-2 py-1.5 text-ink-700 transition-colors hover:bg-paper-muted hover:text-brand-700"
                        >
                          {page.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

async function safeListSections() {
  try {
    return await listSections();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[docs] Could not load sections from Strapi:", (err as Error).message);
    }
    return [];
  }
}
