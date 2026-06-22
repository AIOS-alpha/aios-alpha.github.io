// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Org GitHub Pages site — served at the root, so no `base` needed.
  site: 'https://aios-alpha.github.io',
  integrations: [
      starlight({
          title: 'AIOS',
          logo: {
              src: './src/assets/aios-wordmark.svg',
              replacesTitle: true,
          },
          favicon: '/favicon.svg',
          description: 'An open-source AI transformation toolkit — structured agent workspaces and a shared team memory service.',
          expressiveCode: {
              themes: ['github-dark'],
              styleOverrides: {
                  codeBackground: '#0a0a0a',
                  codeFontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                  borderColor: 'rgba(255, 255, 255, 0.10)',
                  borderRadius: '10px',
              },
          },
          social: [
              { icon: 'github', label: 'GitHub', href: 'https://github.com/your-github-org/aios-workspace' },
          ],
          sidebar: [
              {
                  label: 'Getting Started',
                  items: [
                      { label: 'Quickstart', slug: 'guides/quickstart' },
                      { label: 'Onboarding a contributor', slug: 'getting-started/onboarding-a-contributor' },
                  ],
              },
              {
                  label: 'Guides',
                  items: [
                      { label: 'Your Workspace', slug: 'guides/workspace' },
                      { label: 'The Cockpit', slug: 'guides/cockpit' },
                      { label: 'Team Brain', slug: 'guides/team-brain' },
                      { label: 'Integrations', slug: 'guides/integrations' },
                      { label: 'Harnesses', slug: 'guides/harnesses' },
                      { label: 'Troubleshooting', slug: 'guides/troubleshooting' },
                  ],
              },
              {
                  label: 'Agentic Engineering',
                  items: [
                      { label: 'Maturity Framework', slug: 'agentic' },
                      { label: 'The Maturity Model', slug: 'agentic/maturity-model' },
                      { label: 'Pattern Library', slug: 'agentic/patterns' },
                      { label: 'Self-Assessment', slug: 'agentic/assessment' },
                      { label: 'Who to Learn From', slug: 'agentic/watchlist' },
                      { label: 'Reading List', slug: 'agentic/reading' },
                  ],
              },
              {
                  label: 'Reference',
                  items: [
                      { label: 'Brain API v1', slug: 'reference/brain-api' },
                      { label: 'CLI Commands', slug: 'reference/cli' },
                      { label: 'Glossary', slug: 'reference/glossary' },
                  ],
              },
              { label: 'Changelog', slug: 'changelog' },
              { label: 'Contributing', slug: 'contributing' },
          ],
          customCss: ['./src/styles/custom.css'],
      }),
	],

  vite: {
    plugins: [tailwindcss()],
  },
});