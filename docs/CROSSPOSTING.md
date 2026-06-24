# Cross-posting to Substack

The blog at `getaios.dev/blog` is the **canonical** home for every post.
Substack is a distribution channel. The blog is where interactive embeds work
and where search engines should send people; Substack is where subscribers read.

Substack has no public publishing API, so this can't be fully hands-off. The
reliable path is Substack's built-in **URL importer**, which pulls a published
post's title, prose, and images into a draft. The script below does the
automatable half; the publish click stays manual (and that's fine — it's also
the review step).

## The flow

1. **Publish on the blog.** Merge to `main`; GitHub Actions deploys to
   `getaios.dev`. Confirm the post is live at `getaios.dev/blog/<slug>/`.

2. **Run the helper.**

   ```bash
   npm run crosspost              # newest post
   npm run crosspost <slug>       # a specific post, e.g. introducing-aios
   npm run crosspost <slug> --open  # also opens the URLs in the browser
   ```

   It copies the canonical post URL to your clipboard and prints the steps.

3. **Import on Substack.** Settings → Import/Export → **Import posts** → paste
   the URL. Substack fetches the content into a new draft.

   > Optional deep-link: set `SUBSTACK_IMPORT_URL` to your publication's import
   > page (e.g. `https://yourpub.substack.com/publish/import`) and the script
   > will print/open it directly.

4. **Set the canonical URL.** In the draft's settings, set **Canonical URL** to
   `getaios.dev/blog/<slug>/`. This tells search engines the blog is the
   original, so the Substack copy doesn't compete with it.

5. **Review and publish.** Check formatting and images, then publish/send.

## What carries over (and what doesn't)

- **Carries over:** headings, prose, links, images, code blocks.
- **Diagrams carry over as static `.webp`.** Figures (`<Figure>`) render an
  animated SVG on the web but expose a `.webp` fallback via `<picture>`, so the
  importer picks up the static raster. The motion is web-only; the still reads
  fine on Substack.
- **Does not carry over:** React islands / interactive embeds (e.g. the tier
  explorer). That's expected — they only run on the blog. If a post leans on an
  embed, add a one-line note in the Substack version pointing readers to the
  blog for the interactive version.

## If you want it more automated later

A headless browser flow (Playwright, or the agent's browser automation) could
drive the importer end to end. It needs a logged-in Substack session and your
publication handle, so it's a one-time setup we can add when the cadence
justifies it. Until then, the importer + this helper is the dependable path.
