const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

type Query = Record<string, string | number | boolean | undefined>;

export function strapiMedia(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${STRAPI_URL}${path}`;
}

export async function strapiFetch<T>(
  endpoint: string,
  query: Query = {},
  { revalidate = 60 }: { revalidate?: number | false } = {},
): Promise<T> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
    },
    next: revalidate === false ? undefined : { revalidate, tags: [endpoint] },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Strapi ${res.status} ${res.statusText} — ${endpoint} — ${body}`);
  }

  return res.json() as Promise<T>;
}

/** Strapi 5 response envelope. */
export type StrapiList<T> = {
  data: T[];
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
};

export type StrapiSingle<T> = { data: T };

/* ---------------- Models ---------------- */

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
};

export type Section = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  order: number;
  docPages?: DocPage[];
};

export type DocPage = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  order: number;
  coverImage?: StrapiMedia | null;
  section?: Section | null;
  blocks?: Block[];
  seo?: Seo | null;
};

export type Seo = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  ogImage?: StrapiMedia | null;
};

/* ---------------- Blocks ---------------- */

type BlockBase<T extends string> = { __component: T; id: number };

export type HeroBlock = BlockBase<"shared.hero"> & {
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  version?: string | null;
  meta?: string | null;
  backgroundImage?: StrapiMedia | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
};

export type SectionHeadingBlock = BlockBase<"shared.section-heading"> & {
  eyebrow?: string | null;
  heading: string;
  subheading?: string | null;
  align?: "left" | "center";
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
};

export type RichTextBlock = BlockBase<"shared.rich-text"> & {
  body: unknown;
};

export type CalloutBlock = BlockBase<"shared.callout"> & {
  variant: "info" | "tip" | "success" | "warning" | "danger";
  title?: string | null;
  body: unknown;
};

export type CodeBlockBlock = BlockBase<"shared.code-block"> & {
  language: string;
  filename?: string | null;
  code: string;
  caption?: string | null;
};

export type ImageBlock = BlockBase<"shared.image"> & {
  image: StrapiMedia;
  alt: string;
  caption?: string | null;
  width?: "content" | "wide" | "full";
};

export type FeatureGridBlock = BlockBase<"shared.feature-grid"> & {
  heading?: string | null;
  subheading?: string | null;
  columns: "2" | "3" | "4";
  features: Array<{
    id: number;
    title: string;
    description: string;
    iconName?: string | null;
    iconImage?: StrapiMedia | null;
    link?: string | null;
  }>;
};

export type DecisionTreeBlock = BlockBase<"shared.decision-tree"> & {
  heading?: string | null;
  intro?: string | null;
  diagram?: StrapiMedia | null;
  diagramAlt?: string | null;
  steps: Array<{
    id: number;
    question: string;
    description?: string | null;
    yesOutcome: string;
    yesLink?: string | null;
    noOutcome: string;
    noLink?: string | null;
  }>;
};

export type ColorSwatch = {
  id: number;
  name: string;
  token?: string | null;
  hex: string;
  role?: "brand" | "accent" | "neutral" | "semantic" | "surface" | null;
};

export type ThemePreviewBlock = BlockBase<"shared.theme-preview"> & {
  name: string;
  description?: string | null;
  lightPreview?: StrapiMedia | null;
  darkPreview?: StrapiMedia | null;
  swatches?: ColorSwatch[];
  cssVariables?: string | null;
};

export type IconItem = {
  id: number;
  name: string;
  iconName?: string | null;
  iconImage?: StrapiMedia | null;
  keywords?: string | null;
};

export type IconGridBlock = BlockBase<"shared.icon-grid"> & {
  heading?: string | null;
  description?: string | null;
  columns: "3" | "4" | "5" | "6" | "8";
  icons: IconItem[];
};

export type Block =
  | HeroBlock
  | SectionHeadingBlock
  | RichTextBlock
  | CalloutBlock
  | CodeBlockBlock
  | ImageBlock
  | FeatureGridBlock
  | DecisionTreeBlock
  | ThemePreviewBlock
  | IconGridBlock;

/* ---------------- Fetchers ---------------- */

const DOC_PAGE_POPULATE = {
  "populate[blocks][populate]": "*",
  "populate[coverImage]": "true",
  "populate[seo][populate]": "*",
  "populate[section]": "true",
} satisfies Query;

export async function listSections(): Promise<Section[]> {
  const res = await strapiFetch<StrapiList<Section>>("/sections", {
    "sort[0]": "order:asc",
    "populate[docPages][fields][0]": "title",
    "populate[docPages][fields][1]": "slug",
    "populate[docPages][fields][2]": "order",
    "populate[docPages][sort][0]": "order:asc",
    "pagination[pageSize]": 100,
  });
  return res.data;
}

export async function listDocPages(): Promise<DocPage[]> {
  const res = await strapiFetch<StrapiList<DocPage>>("/doc-pages", {
    "fields[0]": "title",
    "fields[1]": "slug",
    "fields[2]": "order",
    "populate[section][fields][0]": "slug",
    "pagination[pageSize]": 200,
  });
  return res.data;
}

export async function getDocPage(
  sectionSlug: string,
  slug: string,
): Promise<DocPage | null> {
  const res = await strapiFetch<StrapiList<DocPage>>("/doc-pages", {
    ...DOC_PAGE_POPULATE,
    "filters[slug][$eq]": slug,
    "filters[section][slug][$eq]": sectionSlug,
    "pagination[pageSize]": 1,
  });
  return res.data[0] ?? null;
}

/* ---------------- Marketing Pages ---------------- */

export type Page = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  blocks?: Block[];
  seo?: Seo | null;
};

const PAGE_POPULATE = {
  "populate[blocks][populate]": "*",
  "populate[seo][populate]": "*",
} satisfies Query;

export async function getPage(slug: string): Promise<Page | null> {
  const res = await strapiFetch<StrapiList<Page>>("/pages", {
    ...PAGE_POPULATE,
    "filters[slug][$eq]": slug,
    "pagination[pageSize]": 1,
  });
  return res.data[0] ?? null;
}

export async function listPages(): Promise<Array<Pick<Page, "id" | "documentId" | "title" | "slug">>> {
  const res = await strapiFetch<StrapiList<Page>>("/pages", {
    "fields[0]": "title",
    "fields[1]": "slug",
    "pagination[pageSize]": 100,
  });
  return res.data;
}
