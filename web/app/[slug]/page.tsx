import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, listPages, strapiMedia } from "@/lib/strapi";

type Params = { slug: string };

// Reserved top-level paths owned by their own routes / layouts.
const RESERVED = new Set(["docs", "home", "api", "_next"]);

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const pages = await listPages();
    return pages
      .map((p) => ({ slug: p.slug }))
      .filter((p) => !RESERVED.has(p.slug));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED.has(slug)) return { title: "Not found" };

  const page = await safe(() => getPage(slug));
  if (!page) return { title: "Not found" };

  const og = strapiMedia(page.seo?.ogImage?.url);
  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? undefined,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: page.seo?.canonicalUrl
      ? { canonical: page.seo.canonicalUrl }
      : undefined,
    openGraph: og ? { images: [og] } : undefined,
  };
}

export default async function MarketingPageRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  if (RESERVED.has(slug)) notFound();

  const page = await safe(() => getPage(slug));
  if (!page) notFound();

  const blocks = page.blocks ?? [];
  const hasLeadingHero = blocks[0]?.__component === "shared.hero";

  return (
    <>
      <SiteNav variant="solid" />
      <main className="flex flex-1 flex-col pt-24">
        {!hasLeadingHero && (
          <header className="mx-auto w-full max-w-[1200px] px-6 pb-4 pt-12">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
              {page.title}
            </h1>
          </header>
        )}
        {blocks.map((block) => (
          <section
            key={`${block.__component}-${block.id}`}
            className="mx-auto w-full max-w-[1200px] px-6 py-10"
          >
            <BlockRenderer block={block} />
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}

async function safe<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}
