import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { NewsletterCard } from "@/components/newsletter-card";
import { Button } from "@/components/ui/button";
import { BlockRenderer } from "@/components/blocks/block-renderer";
import { getPage, strapiMedia, type Block, type HeroBlock, type Page } from "@/lib/strapi";

const FALLBACK_HERO: HeroBlock = {
  __component: "shared.hero",
  id: 0,
  eyebrow: null,
  title: "Intelligent. Connected. Health.",
  subtitle:
    "We simplify, automate, and unify operations — reducing cost and enabling seamless, high-quality health experiences. With personal productivity tools, AI agents, and AI concierge support, we deliver faster, smarter, more connected interactions.",
  version: null,
  meta: null,
  backgroundImage: null,
  primaryCtaLabel: "Learn more about us",
  primaryCtaHref: "/about",
  secondaryCtaLabel: "View Products",
  secondaryCtaHref: "/products",
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await safePage("home");
  if (!page) return {};
  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? undefined,
    robots: page.seo?.noIndex ? { index: false, follow: false } : undefined,
    alternates: page.seo?.canonicalUrl
      ? { canonical: page.seo.canonicalUrl }
      : undefined,
    openGraph: page.seo?.ogImage?.url
      ? { images: [strapiMedia(page.seo.ogImage.url)!] }
      : undefined,
  };
}

export default async function HomePage() {
  const page = await safePage("home");
  const blocks = page?.blocks ?? [];
  const heroIndex = blocks.findIndex((b) => b.__component === "shared.hero");
  const hero = (heroIndex >= 0 ? blocks[heroIndex] : FALLBACK_HERO) as HeroBlock;
  const remaining = heroIndex >= 0 ? blocks.filter((_, i) => i !== heroIndex) : blocks;

  return (
    <>
      <SiteNav variant="overlay" />

      <main className="flex flex-1 flex-col">
        <HomeHero block={hero} />

        {remaining.map((block) => (
          <BlockSection key={`${block.__component}-${block.id}`} block={block} />
        ))}
      </main>

      <SiteFooter />
    </>
  );
}

function HomeHero({ block }: { block: HeroBlock }) {
  const backgroundImage = strapiMedia(block.backgroundImage?.url);
  return (
    <section className="relative isolate flex min-h-[820px] flex-col justify-end overflow-hidden text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,theme(colors.brand.400/0.6),transparent_60%),linear-gradient(135deg,theme(colors.brand.900),theme(colors.brand.700)_35%,theme(colors.brand.500)_75%,theme(colors.brand.400))]" />
      {backgroundImage && (
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-70 mix-blend-overlay"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div
        className="absolute inset-0 -z-10 opacity-[0.25] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 70% 20%, rgba(255,255,255,.35), transparent 60%), radial-gradient(800px 400px at 20% 80%, rgba(255,255,255,.2), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-40 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,.08) 0 2px, transparent 2px 22px), repeating-linear-gradient(65deg, rgba(0,0,0,.08) 0 2px, transparent 2px 28px)",
        }}
      />

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-end gap-10 px-6 pb-24 pt-48 md:grid-cols-[1.4fr_1fr]">
        <div>
          {block.eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              {block.eyebrow}
            </p>
          )}
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {block.title}
          </h1>
          {block.subtitle && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
              {block.subtitle}
            </p>
          )}
          {(block.primaryCtaLabel || block.secondaryCtaLabel) && (
            <div className="mt-8 flex flex-wrap gap-3">
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
          )}
        </div>

        <div className="md:justify-self-end">
          <NewsletterCard />
        </div>
      </div>
    </section>
  );
}

function BlockSection({ block }: { block: Block }) {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-20">
      <BlockRenderer block={block} />
    </section>
  );
}

async function safePage(slug: string): Promise<Page | null> {
  try {
    return await getPage(slug);
  } catch {
    return null;
  }
}
