import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDocPage, listDocPages, strapiMedia } from "@/lib/strapi";
import { BlockRenderer } from "@/components/blocks/block-renderer";

type Params = { section: string; slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  try {
    const pages = await listDocPages();
    return pages
      .filter((p) => p.section?.slug && p.slug)
      .map((p) => ({ section: p.section!.slug, slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const page = await safe(() => getDocPage(section, slug));
  if (!page) return { title: "Not found" };
  const og = strapiMedia(page.seo?.ogImage?.url ?? page.coverImage?.url);
  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? page.excerpt ?? undefined,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: page.seo?.canonicalUrl
      ? { canonical: page.seo.canonicalUrl }
      : undefined,
    openGraph: og ? { images: [og] } : undefined,
  };
}

export default async function DocPageRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { section, slug } = await params;
  const page = await safe(() => getDocPage(section, slug));
  if (!page) notFound();

  return (
    <article className="space-y-8">
      <header className="border-b border-paper-border pb-6">
        {page.section?.name && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {page.section.name}
          </p>
        )}
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink-900 md:text-5xl">
          {page.title}
        </h1>
        {page.excerpt && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-500">
            {page.excerpt}
          </p>
        )}
      </header>

      {(page.blocks ?? []).map((block) => (
        <BlockRenderer key={`${block.__component}-${block.id}`} block={block} />
      ))}
    </article>
  );
}

async function safe<T>(fn: () => Promise<T | null>): Promise<T | null> {
  try {
    return await fn();
  } catch {
    return null;
  }
}
