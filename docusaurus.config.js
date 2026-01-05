// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DSP Platform',
  tagline: 'Data Synchronization Platform - Sync your data seamlessly across databases',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.dsp-platform.io',
  baseUrl: '/',

  organizationName: 'dsp-platform',
  projectName: 'docs-dsp',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/dsp-platform/docs-dsp/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/dsp-platform/docs-dsp/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/dsp-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'DSP Platform',
        logo: {
          alt: 'DSP Platform Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/category/getting-started',
            label: 'Getting Started',
            position: 'left',
          },
          { to: '/blog', label: 'Changelog', position: 'left' },
          {
            href: 'https://github.com/alfalaq12/dsp-platform',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'Installation',
                to: '/docs/category/installation',
              },
              {
                label: 'Configuration',
                to: '/docs/category/configuration',
              },
            ],
          },
          {
            title: 'Features',
            items: [
              {
                label: 'Database Sync',
                to: '/docs/category/database-sync',
              },
              {
                label: 'MinIO Mirror',
                to: '/docs/category/minio-mirror',
              },
              {
                label: 'Network Setup',
                to: '/docs/category/network',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Changelog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/alfalaq12/dsp-platform',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DSP Platform. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.dracula,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'yaml', 'go', 'sql'],
      },
    }),
};

export default config;
