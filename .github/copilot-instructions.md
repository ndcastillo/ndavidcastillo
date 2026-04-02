# Copilot Instructions - Astro Blog

## Build & Development Commands

```bash
# Development server (http://localhost:4321)
npm run dev

# Production build (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- <command>
```

**Node Version:** Requires Node.js >=22.12.0

## Architecture Overview

This is a **static site generated (SSG) Astro blog** using the Content Collections API.

### Content Collections Pattern

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files with validated frontmatter:

```typescript
// src/content.config.ts defines the schema
{
  title: string,
  description: string,
  pubDate: Date,          // Coerced from string in frontmatter
  updatedDate?: Date,     // Optional
  heroImage?: ImageMetadata  // Relative path to src/assets/
}
```

**Key APIs:**
- `getCollection('blog')` - Fetch all blog posts with type safety
- `getStaticPaths()` - Generate static routes at build time for `[...slug].astro`
- `render()` - Compile Markdown/MDX to HTML components

### Routing

- **File-based routing:** Files in `src/pages/` become routes
- **Dynamic routes:** `/blog/[...slug].astro` generates routes for each blog post
- **Post URLs:** Derived from filename, e.g., `first-post.md` → `/blog/first-post/`

### Image Handling

Use Astro's `<Image>` component from `astro:assets` for automatic optimization:

```astro
import { Image } from 'astro:assets';

<Image src={heroImage} alt="Description" />
```

Images in frontmatter are referenced relative to the markdown file:
```yaml
heroImage: '../../assets/blog-placeholder-3.jpg'
```

### Layout System

**BlogPost.astro** is the primary layout for individual posts. It:
- Accepts `CollectionEntry<'blog'>['data']` as props
- Renders hero images, dates, and formatted content
- Applies max-width (720px) and typography styling

Components use **scoped `<style>` tags** to avoid CSS conflicts.

## Key Conventions

### Site-Wide Configuration

**src/consts.ts** contains global constants:
```typescript
export const SITE_TITLE = 'DC - Blog Personal';
export const SITE_DESCRIPTION = 'Blog con contenido de tecnología, desarrollo e innovación!';
```

Import these instead of hardcoding site info.

### Styling Approach

- **Global CSS:** `src/styles/global.css` with CSS variables (`:root`)
- **Component styles:** Scoped `<style>` tags in each `.astro` file
- **No CSS framework** - pure CSS with CSS variables
- **Mobile breakpoint:** 720px
- **Color theme:**
  - `--accent: #000`
  - `--accent-dark: #000d8a`
  - RGB variables for opacity control: `--black`, `--gray`, etc.

### TypeScript Configuration

- **Extends:** `astro/tsconfigs/strict`
- **strictNullChecks:** Enabled
- All `.astro` components support TypeScript in frontmatter and scripts

### SEO Pattern

The `<BaseHead>` component handles all meta tags. Every page should include:

```astro
import BaseHead from '../components/BaseHead.astro';

<head>
  <BaseHead title="Page Title" description="Page description" />
</head>
```

This automatically adds:
- Canonical URLs
- Open Graph tags
- Twitter Card meta
- RSS feed link
- Sitemap reference

### Active Navigation State

Use `<HeaderLink>` component for navigation - it auto-detects active state by comparing `href` with `Astro.url.pathname`.

### Date Formatting

Use `<FormattedDate>` component for consistent date display:

```astro
import FormattedDate from '../components/FormattedDate.astro';

<FormattedDate date={pubDate} />
```

Outputs format: "Month DD, YYYY" (e.g., "Jul 08, 2022")

### Blog Post Sorting

Always sort blog posts by `pubDate` descending:

```typescript
const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

### RSS Feed

The `src/pages/rss.xml.js` endpoint generates the RSS feed. Update when:
- Adding custom frontmatter fields you want in the feed
- Changing the site URL or metadata

### Static Asset Placement

- **Optimized images:** `src/assets/` (processed by Astro)
- **Static files:** `public/` (copied as-is to output)
- **Fonts:** `public/fonts/` (preloaded in BaseHead.astro)

## Integrations

Currently installed:
- `@astrojs/mdx` - JSX in Markdown
- `@astrojs/sitemap` - Auto-generates sitemap.xml
- `@astrojs/rss` - RSS feed generation

## Configuration Files

- **astro.config.mjs:** Site URL set to `https://example.com` - update before deploying
- **tsconfig.json:** Strict TypeScript with strictNullChecks
- **src/content.config.ts:** Content collection schemas (modify for new frontmatter fields)
