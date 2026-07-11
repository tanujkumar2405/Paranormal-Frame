const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
const blogRoot = path.join(repoRoot, 'blog');
const dataDir = path.join(blogRoot, 'blog-data');
const templatesDir = path.join(blogRoot, 'templates');
const generatedDir = path.join(blogRoot, 'generated');
const assetsDir = path.join(blogRoot, 'assets');
const rootIndexPath = path.join(repoRoot, 'index.html');
const rootSitemapPath = path.join(repoRoot, 'sitemap.xml');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (trimmed.includes(',')) {
    return trimmed.split(',').map((item) => item.trim()).filter(Boolean);
  }
  if (/^(true|false)$/i.test(trimmed)) {
    return trimmed.toLowerCase() === 'true';
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  return trimmed.replace(/^['"]|['"]$/g, '');
}

function parseFrontMatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    return { frontMatter: {}, body: raw.trim() };
  }

  const frontMatter = {};
  let currentListKey = null;
  const lines = match[1].split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    if (trimmed.startsWith('- ')) {
      if (currentListKey) {
        const item = trimmed.replace(/^-\s*/, '').trim();
        if (item) {
          if (!Array.isArray(frontMatter[currentListKey])) {
            frontMatter[currentListKey] = [];
          }
          frontMatter[currentListKey].push(parseScalar(item));
        }
      }
      continue;
    }

    currentListKey = null;
    const separatorIndex = trimmed.indexOf(':');
    if (separatorIndex === -1) continue;
    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!key) continue;

    if (value === '') {
      let nextIndex = index + 1;
      while (nextIndex < lines.length && !lines[nextIndex].trim()) {
        nextIndex += 1;
      }
      if (nextIndex < lines.length && lines[nextIndex].trim().startsWith('- ')) {
        frontMatter[key] = [];
        currentListKey = key;
      } else {
        frontMatter[key] = '';
      }
      continue;
    }

    frontMatter[key] = parseScalar(value);
  }

  return { frontMatter, body: match[2].trim() };
}

function stripMarkdownFormatting(value) {
  return value
    .replace(/[#>*_`\[\]]/g, '')
    .replace(/\(([^)]+)\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');
}

function normalizeUrl(value) {
  if (!value) return '';
  if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('/')) return value;
  return `/${value.replace(/^\.\//, '').replace(/^\//, '')}`;
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function getDateKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isScheduledArticle(value) {
  const targetDate = getDateKey(value);
  if (!targetDate) return false;
  const today = new Date();
  const todayKey = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return targetDate > todayKey;
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

function renderInlineMarkdown(text) {
  let html = escapeHtml(text);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" decoding="async">');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  return html;
}

function renderMarkdown(body, options = {}) {
  const lines = body.split(/\r?\n/);
  const html = [];
  let paragraphLines = [];
  let listType = null;
  let listItems = [];
  let codeBuffer = [];
  let blockquoteLines = [];

  const flushParagraph = () => {
    if (paragraphLines.length) {
      html.push(`<p>${renderInlineMarkdown(paragraphLines.join(' '))}</p>`);
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      const tag = listType === 'ordered' ? 'ol' : 'ul';
      html.push(`<${tag}>${listItems.map((item) => `<li>${renderInlineMarkdown(item)}</li>`).join('')}</${tag}>`);
      listItems = [];
      listType = null;
    }
  };

  const flushCode = () => {
    if (codeBuffer.length) {
      html.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`);
      codeBuffer = [];
    }
  };

  const flushBlockquote = () => {
    if (blockquoteLines.length) {
      html.push(`<blockquote>${blockquoteLines.map((line) => `<p>${renderInlineMarkdown(line)}</p>`).join('')}</blockquote>`);
      blockquoteLines = [];
    }
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      codeBuffer = [];
      continue;
    }

    if (codeBuffer.length >= 0 && /^```/.test(trimmed) === false && codeBuffer.length === 0 && line.startsWith('```')) {
      continue;
    }

    if (codeBuffer.length >= 0 && line.startsWith('```')) {
      flushCode();
      continue;
    }

    if (codeBuffer.length >= 0 && !line.startsWith('```') && codeBuffer.length !== undefined) {
      // handled below
    }

    if (codeBuffer.length > 0) {
      codeBuffer.push(line);
      continue;
    }

    if (/^#{1,6}\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushBlockquote();
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.replace(/^#{1,6}\s+/, '');
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      html.push(`<h${level} id="${slug}">${renderInlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (/^>/.test(trimmed)) {
      flushParagraph();
      flushList();
      blockquoteLines.push(trimmed.replace(/^>\s?/, ''));
      continue;
    }

    if (/^\s*[-*]\s+/.test(trimmed)) {
      flushParagraph();
      flushBlockquote();
      listType = 'unordered';
      listItems.push(trimmed.replace(/^\s*[-*]\s+/, ''));
      continue;
    }

    if (/^\s*\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      flushBlockquote();
      listType = 'ordered';
      listItems.push(trimmed.replace(/^\s*\d+\.\s+/, ''));
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushBlockquote();
      continue;
    }

    paragraphLines.push(trimmed);
  }

  flushParagraph();
  flushList();
  flushCode();
  flushBlockquote();

  return html.join('\n');
}

function extractHeadings(body) {
  const headings = [];
  for (const line of body.split(/\r?\n/)) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (match) {
      const text = match[1].trim();
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ text, slug });
    }
  }
  return headings;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeAssetPath(assetPath) {
  const fallback = '/assets/images/AERM%20Research%20Journal.png';
  if (!assetPath) return fallback;

  const normalized = assetPath.startsWith('/') ? assetPath : `/blog/assets/images/${assetPath}`;
  const diskPath = path.join(repoRoot, normalized.replace(/^\/+/, ''));
  return fs.existsSync(diskPath) ? normalized : fallback;
}

function clearDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) return;
  for (const entry of fs.readdirSync(dirPath)) {
    const fullPath = path.join(dirPath, entry);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

function renderPageTemplate({ title, description, canonicalUrl, content, extraHead = '', pageType = 'page' }) {
  const template = readText(path.join(templatesDir, 'page-template.html'));
  return template
    .replace('{{PAGE_TITLE}}', escapeHtml(title))
    .replace('{{META_DESCRIPTION}}', escapeHtml(description))
    .replace('{{CANONICAL_URL}}', canonicalUrl)
    .replace('{{OG_TITLE}}', escapeHtml(title))
    .replace('{{OG_DESCRIPTION}}', escapeHtml(description))
    .replace('{{PAGE_CONTENT}}', content)
    .replace('{{EXTRA_HEAD}}', extraHead)
    .replace('{{PAGE_TYPE}}', pageType);
}

function renderArticleTemplate({ article, content, toc, relatedPosts, prevPost, nextPost, schema }) {
  const template = readText(path.join(templatesDir, 'article-template.html'));
  return template
    .replace('{{PAGE_TITLE}}', escapeHtml(article.title))
    .replace('{{META_DESCRIPTION}}', escapeHtml(article.description))
    .replace('{{CANONICAL_URL}}', article.canonicalUrl)
    .replace('{{OG_TITLE}}', escapeHtml(article.title))
    .replace('{{OG_DESCRIPTION}}', escapeHtml(article.description))
    .replace('{{OG_IMAGE}}', article.featuredImage)
    .replace('{{ARTICLE_CONTENT}}', content)
    .replace('{{TOC}}', toc)
    .replace('{{RELATED_POSTS}}', relatedPosts)
    .replace('{{PREVIOUS_POST}}', prevPost)
    .replace('{{NEXT_POST}}', nextPost)
    .replace('{{ARTICLE_SCHEMA}}', schema);
}

function buildArticleHtml(article, allArticles, index) {
  const htmlBody = renderMarkdown(article.body);
  const headings = extractHeadings(article.body);
  const toc = headings.length
    ? `<nav class="article-toc" aria-label="Table of contents"><h2>Contents</h2><ol>${headings.map((heading) => `<li><a href="#${heading.slug}">${escapeHtml(heading.text)}</a></li>`).join('')}</ol></nav>`
    : '<div class="article-toc empty"></div>';

  const relatedPosts = buildRelatedPosts(article, allArticles);
  const prevPost = index > 0 ? `<a class="post-nav-link" href="/blog/generated/articles/${allArticles[index - 1].slug}.html">← ${escapeHtml(allArticles[index - 1].title)}</a>` : '<span></span>';
  const nextPost = index < allArticles.length - 1 ? `<a class="post-nav-link" href="/blog/generated/articles/${allArticles[index + 1].slug}.html">${escapeHtml(allArticles[index + 1].title)} →</a>` : '<span></span>';

  const articleSchema = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ${JSON.stringify(article.title)},
      "description": ${JSON.stringify(article.description)},
      "author": {
        "@type": "Person",
        "name": ${JSON.stringify(article.author || 'AERM')}
      },
      "datePublished": ${JSON.stringify(article.date)},
      "image": ${JSON.stringify(article.featuredImage)},
      "publisher": {
        "@type": "Organization",
        "name": "Anomalous Evidence Research & Media"
      },
      "mainEntityOfPage": ${JSON.stringify(article.canonicalUrl)}
    }
    </script>`;

  const scheduledNotice = article.scheduled ? `<div class="article-scheduled">This article is scheduled to publish on ${escapeHtml(formatDate(article.date))}.</div>` : '';

  return renderArticleTemplate({
    article,
    content: `
      <article class="article-card" itemscope itemtype="https://schema.org/Article">
        <header class="article-header">
          <p class="eyebrow">${escapeHtml(article.category || 'Research')}</p>
          <h1 itemprop="headline">${escapeHtml(article.title)}</h1>
          <p class="article-summary">${escapeHtml(article.description)}</p>
          ${scheduledNotice}
          <div class="article-meta">
            <span>${escapeHtml(article.author || 'AERM')}</span>
            <span>${escapeHtml(formatDate(article.date))}</span>
            <span>${article.readingTime} min read</span>
          </div>
        </header>
        <img class="article-hero" src="${article.featuredImage}" alt="${escapeHtml(article.title)}" loading="eager" decoding="async">
        <div class="article-body">
          ${toc}
          <div class="article-content" itemprop="articleBody">${htmlBody}</div>
        </div>
        <footer class="article-footer">
          <div class="article-tags">${article.tags.map((tag) => `<a href="/blog/generated/tags/${slugify(tag)}.html">#${escapeHtml(tag)}</a>`).join('')}</div>
          <div class="article-nav">${prevPost}${nextPost}</div>
        </footer>
      </article>
      ${relatedPosts}
    `,
    toc,
    relatedPosts,
    prevPost,
    nextPost,
    schema: articleSchema,
  });
}

function buildRelatedPosts(article, allArticles) {
  const scored = allArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === article.category) score += 4;
      const sharedTags = candidate.tags.filter((tag) => article.tags.includes(tag));
      score += sharedTags.length * 2;
      if (candidate.keywords.some((keyword) => article.keywords.includes(keyword))) score += 2;
      return { candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.candidate.date.localeCompare(right.candidate.date));

  if (!scored.length) return '';

  const items = scored.slice(0, 3).map(({ candidate }) => `
    <article class="related-card">
      <a href="/blog/generated/articles/${candidate.slug}.html">
        <h3>${escapeHtml(candidate.title)}</h3>
        <p>${escapeHtml(candidate.description)}</p>
      </a>
    </article>
  `).join('');

  return `
    <section class="related-section" aria-labelledby="related-heading">
      <h2 id="related-heading">Related research</h2>
      <div class="related-grid">${items}</div>
    </section>`;
}

function buildSearchIndex(articles) {
  return articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.canonicalUrl,
    category: article.category,
    tags: article.tags,
    text: stripMarkdownFormatting(article.body),
  }));
}

function buildIndexPage(articles) {
  const featured = articles.find((article) => article.featured) || articles[0];
  const latest = articles.slice(0, 3);
  const intro = `
    <section class="hero-card">
      <p class="eyebrow">AERM research journal</p>
      <h1>Independent reporting on evidence, methodology, and public research.</h1>
      <p>Our editorial workflow is designed for transparent, evidence-centered publishing that remains fully static and easy to maintain.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="/blog/generated/search/index.html">Search articles</a>
        <a class="btn btn-secondary" href="/blog/generated/categories/index.html">Browse categories</a>
      </div>
    </section>
  `;

  const featuredCard = featured ? `
    <section class="featured-section" aria-labelledby="featured-heading">
      <div class="section-heading">
        <p class="eyebrow">Featured article</p>
        <h2 id="featured-heading">${escapeHtml(featured.title)}</h2>
      </div>
      <article class="featured-card">
        <img src="${featured.featuredImage}" alt="${escapeHtml(featured.title)}" loading="lazy" decoding="async">
        <div>
          <p class="article-summary">${escapeHtml(featured.description)}</p>
          <a class="text-link" href="/blog/generated/articles/${featured.slug}.html">Read the article →</a>
        </div>
      </article>
    </section>
  ` : '';

  const latestCards = latest.map((article) => `
    <article class="summary-card">
      <p class="eyebrow">${escapeHtml(article.category || 'Research')}</p>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.description)}</p>
      <a class="text-link" href="/blog/generated/articles/${article.slug}.html">Open article →</a>
    </article>
  `).join('');

  return renderPageTemplate({
    title: 'AERM Research Journal',
    description: 'A fully static research blog for AERM, generated from markdown files at build time.',
    canonicalUrl: 'https://paranormalframe.vercel.app/blog/',
    content: `
      ${intro}
      ${featuredCard}
      <section class="listing-section" aria-labelledby="latest-heading">
        <div class="section-heading">
          <p class="eyebrow">Latest articles</p>
          <h2 id="latest-heading">Recent research notes</h2>
        </div>
        <div class="card-grid">${latestCards}</div>
      </section>
    `,
    pageType: 'blog-home',
  });
}

function buildArchivePage(articles) {
  const years = [...new Set(articles.map((article) => article.date.slice(0, 4)))].sort((left, right) => Number(right) - Number(left));
  const archiveMarkup = years.map((year) => {
    const yearArticles = articles.filter((article) => article.date.startsWith(year));
    return `
      <section class="archive-year">
        <h2>${year}</h2>
        <ul>${yearArticles.map((article) => `<li><a href="/blog/generated/articles/${article.slug}.html">${escapeHtml(article.title)}</a></li>`).join('')}</ul>
      </section>
    `;
  }).join('');

  return renderPageTemplate({
    title: 'Archive',
    description: 'Browse the full static archive of AERM research articles.',
    canonicalUrl: 'https://paranormalframe.vercel.app/blog/archive/',
    content: `<section class="listing-section"><h1>Archive</h1>${archiveMarkup}</section>`,
    pageType: 'archive',
  });
}

function buildCategoryPages(articles) {
  const categories = new Map();
  for (const article of articles) {
    const key = article.category || 'General';
    if (!categories.has(key)) categories.set(key, []);
    categories.get(key).push(article);
  }

  const categoryIndex = renderPageTemplate({
    title: 'Categories',
    description: 'Browse AERM research by category.',
    canonicalUrl: 'https://paranormalframe.vercel.app/blog/categories/',
    content: `
      <section class="listing-section">
        <h1>Categories</h1>
        <div class="card-grid">
          ${Array.from(categories.entries()).map(([name, items]) => `
            <article class="summary-card">
              <h3>${escapeHtml(name)}</h3>
              <p>${items.length} article${items.length === 1 ? '' : 's'}</p>
              <a class="text-link" href="/blog/generated/categories/${slugify(name)}.html">View category →</a>
            </article>
          `).join('')}
        </div>
      </section>
    `,
    pageType: 'categories-index',
  });

  writeText(path.join(generatedDir, 'categories', 'index.html'), categoryIndex);

  for (const [name, items] of categories.entries()) {
    const html = renderPageTemplate({
      title: `${name} articles`,
      description: `Articles in the ${name} category.`,
      canonicalUrl: `https://paranormalframe.vercel.app/blog/generated/categories/${slugify(name)}.html`,
      content: `
        <section class="listing-section">
          <h1>${escapeHtml(name)}</h1>
          <div class="card-grid">
            ${items.map((article) => `
              <article class="summary-card">
                <h3>${escapeHtml(article.title)}</h3>
                <p>${escapeHtml(article.description)}</p>
                <a class="text-link" href="/blog/generated/articles/${article.slug}.html">Read article →</a>
              </article>
            `).join('')}
          </div>
        </section>
      `,
      pageType: 'category-page',
    });
    writeText(path.join(generatedDir, 'categories', `${slugify(name)}.html`), html);
  }
}

function buildTagPages(articles) {
  const tagMap = new Map();
  for (const article of articles) {
    for (const tag of article.tags) {
      if (!tagMap.has(tag)) tagMap.set(tag, []);
      tagMap.get(tag).push(article);
    }
  }

  const tagIndex = renderPageTemplate({
    title: 'Tags',
    description: 'Browse AERM research by tag.',
    canonicalUrl: 'https://paranormalframe.vercel.app/blog/tags/',
    content: `
      <section class="listing-section">
        <h1>Tags</h1>
        <div class="tag-cloud">
          ${Array.from(tagMap.entries()).map(([name, items]) => `<a class="tag-pill" href="/blog/generated/tags/${slugify(name)}.html">${escapeHtml(name)} (${items.length})</a>`).join('')}
        </div>
      </section>
    `,
    pageType: 'tags-index',
  });

  writeText(path.join(generatedDir, 'tags', 'index.html'), tagIndex);

  for (const [name, items] of tagMap.entries()) {
    const html = renderPageTemplate({
      title: `#${name}`,
      description: `Articles tagged with ${name}.`,
      canonicalUrl: `https://paranormalframe.vercel.app/blog/generated/tags/${slugify(name)}.html`,
      content: `
        <section class="listing-section">
          <h1>#${escapeHtml(name)}</h1>
          <div class="card-grid">
            ${items.map((article) => `
              <article class="summary-card">
                <h3>${escapeHtml(article.title)}</h3>
                <p>${escapeHtml(article.description)}</p>
                <a class="text-link" href="/blog/generated/articles/${article.slug}.html">Read article →</a>
              </article>
            `).join('')}
          </div>
        </section>
      `,
      pageType: 'tag-page',
    });
    writeText(path.join(generatedDir, 'tags', `${slugify(name)}.html`), html);
  }
}

function buildSearchPage(searchIndex) {
  const html = renderPageTemplate({
    title: 'Search',
    description: 'Search the static AERM research archive.',
    canonicalUrl: 'https://paranormalframe.vercel.app/blog/search/',
    content: `
      <section class="listing-section">
        <h1>Search</h1>
        <label class="search-box" for="search-query">
          <span class="sr-only">Search posts</span>
          <input id="search-query" type="search" placeholder="Search by topic, category, or tag" autocomplete="off">
        </label>
        <div id="search-results" class="card-grid"></div>
      </section>
      <script src="/blog/generated/search/search.js"></script>
    `,
    pageType: 'search-page',
  });
  writeText(path.join(generatedDir, 'search', 'index.html'), html);
  writeText(path.join(generatedDir, 'search', 'search-index.json'), JSON.stringify(searchIndex, null, 2));
  writeText(path.join(generatedDir, 'search', 'search.js'), `
    const searchIndex = ${JSON.stringify(searchIndex)};
    const input = document.getElementById('search-query');
    const results = document.getElementById('search-results');
    function renderResults(query) {
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        results.innerHTML = '<p class="empty-state">Start typing to search the archive.</p>';
        return;
      }
      const matches = searchIndex.filter((article) => {
        const haystack = [article.title, article.description, article.category, ...(article.tags || []), article.text].join(' ').toLowerCase();
        return haystack.includes(normalized);
      });
      const markup = matches.length
        ? matches.map((article) => '<article class="summary-card">' +
          '<h3>' + article.title + '</h3>' +
          '<p>' + article.description + '</p>' +
          '<a class="text-link" href="' + article.url + '">Open article →</a>' +
          '</article>').join('')
        : '<p class="empty-state">No articles matched that query.</p>';
      results.innerHTML = markup;
    }
    if (input) {
      input.addEventListener('input', (event) => renderResults(event.target.value));
    }
    renderResults('');
  `);
}

function buildRss(articles) {
  const items = articles.map((article) => `
    <item>
      <title>${escapeHtml(article.title)}</title>
      <link>${article.canonicalUrl}</link>
      <guid>${article.canonicalUrl}</guid>
      <description>${escapeHtml(article.description)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>
  `).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AERM Research Journal</title>
    <link>https://paranormalframe.vercel.app/blog/</link>
    <description>Static research updates generated from markdown files.</description>
    ${items}
  </channel>
</rss>`;
  writeText(path.join(blogRoot, 'rss.xml'), rss);
  writeText(path.join(generatedDir, 'rss.xml'), rss);
}

function buildBlogSitemap(articles) {
  const urls = articles.map((article) => `    <url><loc>${article.canonicalUrl}</loc></url>`).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://paranormalframe.vercel.app/blog/</loc></url>
  <url><loc>https://paranormalframe.vercel.app/blog/archive/</loc></url>
  <url><loc>https://paranormalframe.vercel.app/blog/categories/</loc></url>
  <url><loc>https://paranormalframe.vercel.app/blog/tags/</loc></url>
  <url><loc>https://paranormalframe.vercel.app/blog/search/</loc></url>
${urls}
</urlset>`;
  writeText(path.join(blogRoot, 'sitemap.xml'), sitemap);
  writeText(path.join(generatedDir, 'sitemap.xml'), sitemap);
}

function updateRootSitemap(articles) {
  const blogUrls = articles.map((article) => `  <url><loc>${article.canonicalUrl}</loc></url>`).join('\n');
  const existing = fs.existsSync(rootSitemapPath) ? readText(rootSitemapPath) : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`;
  if (existing.includes('/blog/')) {
    writeText(rootSitemapPath, existing.replace('</urlset>', `${blogUrls}\n</urlset>`));
    return;
  }
  const updated = existing.replace('</urlset>', `  <url><loc>https://paranormalframe.vercel.app/blog/</loc></url>\n${blogUrls}\n</urlset>`);
  writeText(rootSitemapPath, updated);
}

function injectBlogPreviewIntoHomePage(content, previewMarkup) {
  const markerStart = '<!-- BLOG_PREVIEW_START -->';
  const markerEnd = '<!-- BLOG_PREVIEW_END -->';
  if (!content.includes(markerStart) || !content.includes(markerEnd)) {
    return content;
  }

  const html = `
    ${markerStart}
    <section class="blog-preview-section" aria-labelledby="blog-preview-title">
      <div class="section-header">
        <h2 id="blog-preview-title">Latest Research Notes</h2>
        <p class="section-subtitle">Fresh, evidence-oriented articles generated from markdown source files.</p>
      </div>
      <div class="blog-preview-grid">
        ${previewMarkup}
      </div>
      <div class="blog-preview-footer">
        <a class="btn btn-secondary" href="/blog/">Explore the full research journal</a>
      </div>
    </section>
    ${markerEnd}
  `;
  return content.replace(/<!-- BLOG_PREVIEW_START -->[\s\S]*?<!-- BLOG_PREVIEW_END -->/, html);
}

function syncBlogExcel() {
  const pythonCommand = process.platform === 'win32' ? 'python' : 'python3';
  const result = spawnSync(pythonCommand, ['blog/build/sync_blog_excel.py'], {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    console.warn('[sync] Blog Excel workbook sync failed.');
    return;
  }

  console.log('[sync] Blog Excel workbook updated.');
}

function generateBlog() {
  ensureDir(dataDir);
  ensureDir(generatedDir);
  clearDirectory(generatedDir);
  ensureDir(path.join(generatedDir, 'articles'));
  ensureDir(path.join(generatedDir, 'categories'));
  ensureDir(path.join(generatedDir, 'tags'));
  ensureDir(path.join(generatedDir, 'search'));
  ensureDir(path.join(generatedDir, 'archives'));
  ensureDir(path.join(assetsDir, 'images'));

  const sourceFiles = fs.readdirSync(dataDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => path.join(dataDir, file));

  const articles = [];
  for (const filePath of sourceFiles) {
    const raw = readText(filePath);
    const { frontMatter, body } = parseFrontMatter(raw);
    if (frontMatter.draft) continue;

    const fileStats = fs.statSync(filePath);
    const title = frontMatter.title || path.basename(filePath, '.md');
    const slug = frontMatter.slug || slugify(title);
    const category = frontMatter.category || 'Research';
    const tags = Array.isArray(frontMatter.tags) ? frontMatter.tags : String(frontMatter.tags || '').split(',').map((value) => value.trim()).filter(Boolean);
    const keywords = Array.isArray(frontMatter.keywords) ? frontMatter.keywords : String(frontMatter.keywords || '').split(',').map((value) => value.trim()).filter(Boolean);
    const description = frontMatter.description || 'Static article generated from markdown source.';
    const featuredImage = normalizeAssetPath(frontMatter.featuredImage || undefined);
    const fallbackDate = fileStats.mtime.toISOString().slice(0, 10);
    const resolvedDate = frontMatter.date && String(frontMatter.date).trim() ? String(frontMatter.date).trim() : fallbackDate;
    const article = {
      title,
      slug,
      author: frontMatter.author || 'AERM Editorial Team',
      date: resolvedDate,
      scheduled: isScheduledArticle(resolvedDate),
      category,
      tags,
      keywords,
      description,
      featuredImage,
      featured: Boolean(frontMatter.featured),
      draft: Boolean(frontMatter.draft),
      body,
      canonicalUrl: `https://paranormalframe.vercel.app/blog/generated/articles/${slug}.html`,
      readingTime: frontMatter.readingTime === 'auto' ? readingTime(body) : Number(frontMatter.readingTime || readingTime(body)),
    };
    articles.push(article);
  }

  articles.sort((left, right) => new Date(right.date) - new Date(left.date));

  const publishedArticles = articles.filter((article) => !article.scheduled);
  const latestPreview = publishedArticles.slice(0, 3).map((article) => `
    <article class="blog-preview-card">
      <p class="eyebrow">${escapeHtml(article.category)}</p>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.description)}</p>
      <a class="text-link" href="/blog/generated/articles/${article.slug}.html">Read article →</a>
    </article>
  `).join('');

  const homeContent = readText(rootIndexPath);
  const updatedHomeContent = injectBlogPreviewIntoHomePage(homeContent, latestPreview);
  writeText(rootIndexPath, updatedHomeContent);

  for (const [index, article] of articles.entries()) {
    const html = buildArticleHtml(article, articles, index);
    writeText(path.join(generatedDir, 'articles', `${article.slug}.html`), html);
  }

  writeText(path.join(blogRoot, 'index.html'), buildIndexPage(publishedArticles));
  buildCategoryPages(publishedArticles);
  buildTagPages(publishedArticles);
  buildSearchPage(buildSearchIndex(publishedArticles));
  writeText(path.join(generatedDir, 'archives', 'index.html'), buildArchivePage(publishedArticles));
  buildRss(publishedArticles);
  buildBlogSitemap(publishedArticles);
  updateRootSitemap(publishedArticles);

  if (process.env.VERCEL !== "1") {
    syncBlogExcel();
}
  console.log(`Generated ${articles.length} article(s) for the static blog.`);
}

function watchBlog() {
  let rebuildTimer = null;
  const triggerBuild = () => {
    if (rebuildTimer) clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(() => {
      console.log('[watch] Change detected. Rebuilding blog...');
      generateBlog();
    }, 250);
  };

  generateBlog();
  console.log(`[watch] Watching ${dataDir} for markdown changes...`);

  try {
    fs.watch(dataDir, { persistent: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.md')) return;
      console.log(`[watch] ${eventType}: ${filename}`);
      triggerBuild();
    });
  } catch (error) {
    console.warn('[watch] Could not start file watcher for blog-data.', error.message);
  }

  process.on('SIGINT', () => {
    console.log('[watch] Stopping blog watcher.');
    process.exit(0);
  });
}

function main() {
  if (process.argv.includes('--watch')) {
    watchBlog();
    return;
  }

  generateBlog();
}

main();
