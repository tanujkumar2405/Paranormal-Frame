# AERM Static Blog System

A fully automated, static blog system that publishes markdown articles to the AERM website. **No manual build steps required** — changes sync automatically in the background.

## Quick Start (First Time?)

1. **Navigate to** `blog/blog-data/`
2. **Create a new markdown file** with a `.md` extension (e.g., `my-article.md`)
3. **Add front matter** (see example below)
4. **Write your article** in Markdown
5. **Save the file** — the blog rebuilds automatically

That's it. Everything else happens in the background.

## Example Article

```markdown
---
title: Understanding EMF Meters in Paranormal Investigations
author: AERM Research Team
date: 2026-07-08
category: Research
tags:
  - equipment
  - methodology
  - field-guides
description: A practical guide to EMF meter types, calibration, and field use.
featuredImage: emf-meters.jpg
featured: false
draft: false
---

# Understanding EMF Meters in Paranormal Investigations

Your article content in Markdown format...

## Section heading

More content here.
```

## Front Matter Fields

| Field | Required | Description | Examples |
|-------|----------|-------------|----------|
| `title` | Yes | Article headline | "Understanding EMF Meters" |
| `author` | No | Author name (defaults to "AERM Editorial Team") | "Jane Smith" |
| `date` | No | Publication date (auto-uses file modification date if omitted) | "2026-07-15" |
| `category` | No | Article category (defaults to "Research") | "Research", "Methods", "Equipment" |
| `tags` | No | List of topic tags (use `-` for each tag) | `- methodology` `- analysis` |
| `description` | No | Brief summary for listings | "How to interpret..." |
| `featuredImage` | No | Image file in `blog/assets/images/` | "emf-meters.jpg" |
| `featured` | No | Show on featured section (`true` or `false`) | "false" |
| `draft` | No | Hide article (`true` = hidden, `false` = published) | "false" |

## Automatic Features

### Publishing
- Articles appear automatically on the homepage, blog feed, categories, and search
- Images in articles link automatically — just place them in `blog/assets/images/`

### Scheduling (Future Dates)
If you set a future date, the article remains accessible but hidden from public feeds until that date:
```yaml
date: 2026-07-25  # This article publishes on July 25
```

### Generated Pages
The blog automatically creates:
- Individual article pages
- Category pages
- Tag pages
- Search index with live filtering
- RSS feed for subscribers
- Sitemap entries for SEO
- Homepage preview (latest 3 articles)

## File Structure

```
blog/
  blog-data/           ← Create your .md files here
    article1.md
    article2.md
  assets/
    images/            ← Add article images here
      article-hero.jpg
  generated/           ← Auto-generated output (do not edit)
    articles/
    categories/
    tags/
    search/
  templates/           ← Article page HTML template
  build/
    generate-blog.js   ← The build script
  README.md            ← This file
  sitemap.xml          ← Auto-generated XML feed
  rss.xml              ← Auto-generated RSS feed
  index.html           ← Blog homepage
```

## How It Works

1. **Watch Process**: The system continuously monitors `blog/blog-data/` for changes
2. **Markdown to HTML**: Your `.md` files are converted to static HTML pages
3. **Homepage Updates**: Latest articles automatically appear on the main site
4. **Background Rebuild**: No terminal commands needed — everything is automated

## Available Commands

```bash
# Build the blog once (used on Vercel deployment)
npm run build

# Watch for changes and rebuild automatically (for local development)
npm run watch
```

## Examples

See existing articles in `blog/blog-data/`:
- `environmental-methodology-and-evidence-review.md`
- `research-ethics-and-transparency.md`

## Markdown Syntax

The blog supports standard Markdown:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`inline code`

- Bullet list
- Item 2

1. Numbered list
2. Item 2

> Blockquote

![Image alt](image.jpg)
[Link text](https://example.com)

```markdown
code block
```
```

## SEO & Indexing

- Each article gets a canonical URL for SEO
- Articles appear in search index automatically
- RSS feed available for subscribers
- Sitemap updated automatically

## Questions?

Check the example articles in `blog/blog-data/` to see how real posts are structured.
