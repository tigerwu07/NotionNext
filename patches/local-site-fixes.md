# Local Site Fixes

This file records small local patches that should be checked after syncing from upstream NotionNext.

## Hexo home banner fallback

- Files:
  - `themes/hexo/components/Hero.js`
- Reason:
  - The Hexo home hero previously rendered only `siteInfo.pageCover`.
  - After upstream syncs, the Notion Config value `HOME_BANNER_IMAGE` may exist in page props while `siteInfo.pageCover` is empty or not the intended value.
- Keep until:
  - Upstream Hexo `Hero` reliably reads `siteConfig('HOME_BANNER_IMAGE')` or otherwise preserves the configured banner image.

## Hexo post list route fallback

- Files:
  - `themes/hexo/index.js`
  - `themes/hexo/components/BlogPostListPage.js`
- Reason:
  - Client-side navigation to tag, category, or paginated routes could render an empty list even when `allNavPages` in page props contains posts.
  - Hexo now derives a fallback list from `allNavPages` when route props contain no `posts`.
- Keep until:
  - Upstream fixes Hexo list rendering so client-side navigation and refresh produce the same post list.

## Encoded Chinese tag/category routes

- Files:
  - `pages/tag/[tag]/index.js`
  - `pages/tag/[tag]/page/[page].js`
  - `pages/category/[category]/index.js`
  - `pages/category/[category]/page/[page].js`
  - `themes/hexo/components/*`
  - `themes/hexo/index.js`
- Reason:
  - Chinese tag/category names need consistent `encodeURIComponent` on links and safe `decodeURIComponent` before filtering.
- Keep until:
  - Upstream consistently encodes links and decodes dynamic route params before matching post metadata.

## Blocking fallback for list routes

- Files:
  - `pages/page/[page].js`
  - `pages/tag/[tag]/index.js`
  - `pages/tag/[tag]/page/[page].js`
  - `pages/category/[category]/index.js`
  - `pages/category/[category]/page/[page].js`
- Reason:
  - `fallback: true` can briefly render incomplete props during client-side navigation.
  - `fallback: 'blocking'` waits for data before rendering these list pages.
- Keep until:
  - Upstream handles fallback loading states for these routes without empty post lists.

## Live2D disabled by default

- Files:
  - `conf/widget.config.js`
- Reason:
  - The Live2D widget can throw client-side pointer-event errors and interfere with route rendering.
  - The component is left intact for easier upstream sync; only `WIDGET_PET` defaults to `false`.
- To re-enable:
  - Set `NEXT_PUBLIC_WIDGET_PET=true` in Vercel or local environment.
