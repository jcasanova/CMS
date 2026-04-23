# CMS & Website

Content Management System and marketing/docs website for the Enterprise AI team
(featuring the **Hue Design System**). Monorepo layout:

```
.                 ← Strapi 5 CMS (this directory)
└── web/          ← Next.js 16 website
```

## Prerequisites

- Node.js `>=20.0.0 <=24.x.x`
- npm `>=6.0.0`

## Quick start

Open two terminals.

**Terminal 1 — Strapi (port 1337):**

```
npm install
npm run develop
```

Sign into the admin at <http://localhost:1337/admin>. Create a Section (e.g.
"Welcome"), then create a Doc Page under it with some blocks. Grant `find` and
`findOne` permissions to the **Public** role under *Settings → Users &
Permissions → Roles → Public* for `Section` and `Doc Page`.

**Terminal 2 — Next.js website (port 3000):**

```
cd web
cp .env.example .env.local   # first time only
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Content model

**Collection types**

| Type       | Purpose                                         |
| ---------- | ----------------------------------------------- |
| `Section`  | Grouping of doc pages (Welcome, Theming, ...)   |
| `Doc Page` | A documentation page with block-based content   |
| `Page`     | Generic marketing/landing pages                 |

**Shared components** (reusable in Dynamic Zones)

`hero`, `section-heading`, `rich-text`, `callout`, `code-block`, `image`,
`feature-grid`, `feature-item`, `seo`.

## Website scripts (`/web`)

```
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # run the production build
npm run lint     # ESLint
```

## Strapi scripts (root)

```
npm run develop  # Strapi with autoReload
npm run start    # Strapi without autoReload
npm run build    # Build the admin panel
npm run deploy   # Strapi Cloud deploy
```

## Learn more

- [Strapi documentation](https://docs.strapi.io)
- [Next.js documentation](https://nextjs.org/docs)
