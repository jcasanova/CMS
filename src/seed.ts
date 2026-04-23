import type { Core } from '@strapi/strapi';

/* ------------ Rich-text helpers (Strapi blocks editor format) ------------ */

type RTNode = Record<string, unknown>;

const text = (t: string, opts: { bold?: boolean; italic?: boolean; code?: boolean } = {}): RTNode => ({
  type: 'text',
  text: t,
  ...(opts.bold ? { bold: true } : {}),
  ...(opts.italic ? { italic: true } : {}),
  ...(opts.code ? { code: true } : {}),
});

const p = (...children: (RTNode | string)[]): RTNode => ({
  type: 'paragraph',
  children: children.map((c) => (typeof c === 'string' ? text(c) : c)),
});

const h = (level: 1 | 2 | 3 | 4, ...children: (RTNode | string)[]): RTNode => ({
  type: 'heading',
  level,
  children: children.map((c) => (typeof c === 'string' ? text(c) : c)),
});

const ul = (...items: (RTNode | string)[]): RTNode => ({
  type: 'list',
  format: 'unordered',
  children: items.map((item) => ({
    type: 'list-item',
    children: [typeof item === 'string' ? text(item) : item],
  })),
});

/* ---------------------------- Seed data ---------------------------- */

type SectionSeed = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  pages: DocPageSeed[];
};

type DocPageSeed = {
  title: string;
  slug: string;
  excerpt: string;
  order: number;
  blocks: Record<string, unknown>[];
};

const sections: SectionSeed[] = [
  {
    name: 'Welcome',
    slug: 'welcome',
    description: 'Introduction, overview, and getting started.',
    icon: 'Home',
    order: 1,
    pages: [
      {
        title: 'Welcome',
        slug: 'welcome',
        excerpt: 'Thanks for checking out Hue — the design system behind Enterprise AI.',
        order: 1,
        blocks: [
          {
            __component: 'shared.hero',
            eyebrow: 'Enterprise AI Team',
            title: 'Hue Design System',
            subtitle: 'A premium design kit with superpowers — styled in seconds, light and dark mode ready, fully customizable.',
            version: 'v1.0',
            meta: 'Last updated: 10th Feb 2026',
            primaryCtaLabel: 'Get started',
            primaryCtaHref: '/docs/welcome/getting-started',
            secondaryCtaLabel: 'Browse components',
            secondaryCtaHref: '/docs/library/components',
          },
          {
            __component: 'shared.rich-text',
            body: [
              p('Hue ships with a Figma library, a themeable component set, and a decision framework that helps teams stay consistent as they scale.'),
              p("Whether you're shipping a new product surface or refreshing an existing one, Hue gives you a proven starting point."),
            ],
          },
          {
            __component: 'shared.feature-grid',
            heading: 'What you get',
            subheading: 'Batteries included — import, theme, and ship.',
            columns: '3',
            features: [
              { title: 'Figma library', description: 'Fully responsive components mirrored 1:1 with the code library.', iconName: 'Figma' },
              { title: 'Theming toolkit', description: 'Design-tokens and dark mode out of the box, with instant recoloring.', iconName: 'Palette' },
              { title: 'Component kit', description: 'Accessible, production-ready React components built on Tailwind.', iconName: 'Blocks' },
            ],
          },
        ],
      },
      {
        title: 'Overview',
        slug: 'overview',
        excerpt: "What's in the kit, what Hue is, and how teams use it.",
        order: 2,
        blocks: [
          {
            __component: 'shared.section-heading',
            eyebrow: 'Overview',
            heading: 'Using Hue as a library',
            subheading: "Hue is a premium design library you can adopt incrementally. Start with a single screen or re-platform your whole app — the system grows with you.",
          },
          {
            __component: 'shared.rich-text',
            body: [
              h(3, "What's included"),
              ul(
                'Figma library with styles, variables, and components',
                'Light and dark themes',
                'Responsive layouts (mobile, tablet, desktop)',
                'Iconography system with 200+ glyphs',
                'Accessibility-first defaults (WCAG 2.2 AA)',
              ),
              h(3, 'Version'),
              p('Hue follows semver. The current release is ', text('v1.0', { bold: true }), '.'),
            ],
          },
          {
            __component: 'shared.callout',
            variant: 'tip',
            title: 'Inspire your workflow',
            body: [
              p('Pair Hue with the Enterprise AI personal productivity tools to move from brief → prototype in under a day.'),
            ],
          },
        ],
      },
      {
        title: 'Getting started',
        slug: 'getting-started',
        excerpt: 'Install Hue, import the Figma library, and ship your first screen.',
        order: 3,
        blocks: [
          {
            __component: 'shared.rich-text',
            body: [
              h(2, 'Getting started'),
              p('Install the npm package and import the global styles into your app root.'),
            ],
          },
          {
            __component: 'shared.code-block',
            language: 'bash',
            filename: 'Terminal',
            code: 'npm install @enterprise-ai/hue',
          },
          {
            __component: 'shared.code-block',
            language: 'typescript',
            filename: 'app/layout.tsx',
            code: `import "@enterprise-ai/hue/styles.css";

export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>;
}`,
          },
          {
            __component: 'shared.callout',
            variant: 'info',
            title: 'Feedback and requests',
            body: [
              p('Open an issue or ping the #hue channel. We triage weekly.'),
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Foundations',
    slug: 'foundations',
    description: 'Variables, tokens, and decision frameworks.',
    icon: 'Layers',
    order: 2,
    pages: [
      {
        title: 'Variables',
        slug: 'variables',
        excerpt: 'Design tokens and variable collections that drive the system.',
        order: 1,
        blocks: [
          {
            __component: 'shared.section-heading',
            eyebrow: 'Foundations',
            heading: 'Variable collections',
            subheading: 'Hue uses Figma variable collections and CSS custom properties — a single source of truth across design and code.',
          },
          {
            __component: 'shared.rich-text',
            body: [
              h(3, '1. Spacing'),
              p('Spacing follows a 4pt base scale: 4, 8, 12, 16, 24, 32, 48, 64.'),
              h(3, '2. Radii'),
              p('Radii are purposeful — small (6), medium (10), large (16), pill (9999).'),
              h(3, '3. Colors'),
              p('Color tokens are semantic: surface, text, brand, accent, semantic (info / success / warning / danger).'),
            ],
          },
          {
            __component: 'shared.code-block',
            language: 'css',
            filename: 'tokens.css',
            code: `:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --radius-md: 10px;
  --color-brand-500: #1E8E3E;
}`,
          },
        ],
      },
      {
        title: 'Decision Tree',
        slug: 'decision-tree',
        excerpt: 'A flowchart to decide when to extend, customize, or build new.',
        order: 2,
        blocks: [
          {
            __component: 'shared.decision-tree',
            heading: 'Design System Decision Tree',
            intro: "Not every problem needs a new component. Walk through this flow before you build — it'll save you time and keep the library consistent.",
            steps: [
              {
                question: 'Does the design system already contain a component that solves this?',
                description: 'Search the Hue Figma library and the component catalog.',
                yesOutcome: 'Use the existing component as-is. If it needs variants, jump to step 2.',
                yesLink: '/docs/library/components',
                noOutcome: 'Continue to step 2 to check if an extension covers your use case.',
              },
              {
                question: 'Can the use case be solved by extending an existing component?',
                description: 'Extension can be a new variant, size, or color treatment.',
                yesOutcome: 'Propose the variant in the #hue channel, then add it to the library.',
                noOutcome: 'Continue to step 3 to determine if a new component is justified.',
              },
              {
                question: 'Is the use case broad enough to justify a new component?',
                description: 'A new component should solve a problem that recurs in 3+ product surfaces.',
                yesOutcome: 'Open an RFC, then build in the library with tests and docs.',
                yesLink: '/docs/welcome/getting-started',
                noOutcome: 'Build it locally in your product and revisit if the need becomes system-wide.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Theming',
    slug: 'theming',
    description: 'Recolor, re-skin, and theme Hue for any brand.',
    icon: 'Palette',
    order: 3,
    pages: [
      {
        title: 'Regular theming',
        slug: 'regular-theming',
        excerpt: 'Override design tokens to match your brand.',
        order: 1,
        blocks: [
          {
            __component: 'shared.section-heading',
            eyebrow: 'Theming',
            heading: 'Regular theming',
            subheading: 'Override the base tokens in CSS to re-skin Hue without touching component code.',
          },
          {
            __component: 'shared.rich-text',
            body: [
              h(3, 'Editing variables'),
              p("Override variables at the :root scope, or scope them to a container for section-level themes."),
            ],
          },
          {
            __component: 'shared.code-block',
            language: 'css',
            filename: 'theme.css',
            code: `:root[data-theme="brand-b"] {
  --color-brand-500: #7A3BF0;
  --color-brand-600: #6028C8;
  --color-accent-500: #0EA5E9;
}`,
          },
          {
            __component: 'shared.callout',
            variant: 'warning',
            title: 'Contrast matters',
            body: [
              p('After re-theming, run the Hue a11y checker to catch WCAG failures before shipping.'),
            ],
          },
        ],
      },
      {
        title: 'Theme preview',
        slug: 'theme-preview',
        excerpt: 'See how Hue feels under different palettes.',
        order: 2,
        blocks: [
          {
            __component: 'shared.theme-preview',
            name: 'Enterprise AI (default)',
            description: 'The default Hue palette — emerald brand, accent green, neutral paper.',
            swatches: [
              { name: 'Brand 500', token: 'brand/500', hex: '#1E8E3E', role: 'brand' },
              { name: 'Brand 700', token: 'brand/700', hex: '#12602A', role: 'brand' },
              { name: 'Accent 500', token: 'accent/500', hex: '#16A34A', role: 'accent' },
              { name: 'Ink 900', token: 'ink/900', hex: '#0B1A10', role: 'neutral' },
              { name: 'Paper', token: 'surface/paper', hex: '#FDFDFB', role: 'surface' },
              { name: 'Muted', token: 'surface/muted', hex: '#F4F6F2', role: 'surface' },
            ],
            cssVariables: `:root {
  --color-brand-500: #1E8E3E;
  --color-brand-700: #12602A;
  --color-accent-500: #16A34A;
  --color-ink-900: #0B1A10;
  --color-paper: #FDFDFB;
  --color-paper-muted: #F4F6F2;
}`,
          },
        ],
      },
    ],
  },
  {
    name: 'Library',
    slug: 'library',
    description: 'Components and icons you can drop into any screen.',
    icon: 'Blocks',
    order: 4,
    pages: [
      {
        title: 'Components',
        slug: 'components',
        excerpt: "Hue's production-ready component library.",
        order: 1,
        blocks: [
          {
            __component: 'shared.section-heading',
            eyebrow: 'Library',
            heading: 'Components',
            subheading: 'Accessible, composable, and ready to ship.',
          },
          {
            __component: 'shared.feature-grid',
            columns: '3',
            features: [
              { title: 'Button', description: 'Primary, secondary, ghost, and destructive variants with three sizes.', iconName: 'Square' },
              { title: 'Input', description: 'Text, email, password, search — with labels, helpers, and error states.', iconName: 'Type' },
              { title: 'Select', description: 'Single and multi-select with typeahead and keyboard navigation.', iconName: 'ChevronDown' },
              { title: 'Card', description: 'A flexible container with optional header, body, and footer slots.', iconName: 'Square' },
              { title: 'Dialog', description: 'Accessible modal with focus trap and escape-to-close.', iconName: 'Layers' },
              { title: 'Toast', description: 'Transient notifications with queueing and accessible live regions.', iconName: 'Bell' },
            ],
          },
        ],
      },
      {
        title: 'Icons',
        slug: 'icons',
        excerpt: 'The Hue icon set.',
        order: 2,
        blocks: [
          {
            __component: 'shared.section-heading',
            eyebrow: 'Library',
            heading: 'Icons',
            subheading: '24×24 outlined icons with a 1.5px stroke — importable from the Hue icon package.',
          },
          {
            __component: 'shared.icon-grid',
            heading: 'Starter set',
            description: 'A selection of core icons. The full library contains 200+.',
            columns: '6',
            icons: [
              { name: 'Sparkles', iconName: 'Sparkles', keywords: 'shine, magic, ai' },
              { name: 'Brain', iconName: 'Brain', keywords: 'mind, ai, intelligence' },
              { name: 'Cpu', iconName: 'Cpu', keywords: 'processor, chip, compute' },
              { name: 'Home', iconName: 'Home', keywords: 'house, start' },
              { name: 'Search', iconName: 'Search', keywords: 'find, lookup' },
              { name: 'Settings', iconName: 'Settings', keywords: 'gear, preferences' },
              { name: 'Bell', iconName: 'Bell', keywords: 'alert, notification' },
              { name: 'User', iconName: 'User', keywords: 'person, account' },
              { name: 'Heart', iconName: 'Heart', keywords: 'like, favorite' },
              { name: 'Star', iconName: 'Star', keywords: 'favorite, rating' },
              { name: 'Mail', iconName: 'Mail', keywords: 'email, message' },
              { name: 'Calendar', iconName: 'Calendar', keywords: 'date, schedule' },
            ],
          },
        ],
      },
    ],
  },
];

/* -------------------------- Run seed -------------------------- */

export async function seedIfEmpty(strapi: Core.Strapi): Promise<void> {
  // Always ensure public read access — idempotent and needed on every boot.
  await grantPublicReadPermissions(strapi);

  const existing = await strapi.db.query('api::section.section').count();
  if (existing > 0) {
    strapi.log.info('[seed] Sections already exist; skipping seed.');
    return;
  }

  strapi.log.info('[seed] Seeding Hue documentation content…');

  for (const section of sections) {
    const createdSection = await strapi.documents('api::section.section').create({
      data: {
        name: section.name,
        slug: section.slug,
        description: section.description,
        icon: section.icon,
        order: section.order,
      },
      status: 'published',
    });

    for (const page of section.pages) {
      await strapi.documents('api::doc-page.doc-page').create({
        data: {
          title: page.title,
          slug: page.slug,
          excerpt: page.excerpt,
          order: page.order,
          section: createdSection.documentId,
          // Strapi generates strict per-component types for Dynamic Zones;
          // our seed supplies plain objects matching the schema at runtime.
          blocks: page.blocks as never,
        },
        status: 'published',
      });
    }

    strapi.log.info(`[seed]   ✓ Section "${section.name}" with ${section.pages.length} pages`);
  }

  strapi.log.info('[seed] Done — visit /admin to review, /api/doc-pages to consume.');
}

/**
 * Give the Public role `find` + `findOne` on the doc content types so
 * the website can fetch without an API token.
 */
async function grantPublicReadPermissions(strapi: Core.Strapi): Promise<void> {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const actions = [
    'api::section.section.find',
    'api::section.section.findOne',
    'api::doc-page.doc-page.find',
    'api::doc-page.doc-page.findOne',
    'api::page.page.find',
    'api::page.page.findOne',
  ];

  for (const action of actions) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }

  strapi.log.info('[seed] Granted public read permissions for Section / Doc Page / Page.');
}
