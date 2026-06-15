# AIOS — website & docs

The public site and documentation for **AIOS**: structured agent workspaces for every person, plus one shared team brain. Open source, MIT-licensed, self-hosted.

🔗 **Live:** https://aios-alpha.github.io

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build). The landing page is custom; the docs are Starlight.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the build
```

## Structure

```
src/
├── pages/index.astro           # custom landing page
├── components/landing/         # landing sections (Hero, FeatureGrid, Comparison, …)
├── layouts/Landing.astro       # landing layout
├── content/docs/               # Starlight docs (guides + reference)
└── styles/                     # design-tokens.css (source of truth), global.css, custom.css
```

Brand and design system live in `DESIGN.md` and `src/styles/design-tokens.css`.

## Deploy

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## License

MIT — see [LICENSE](LICENSE). Maintained by [Vibrana](https://vibrana.ai).
