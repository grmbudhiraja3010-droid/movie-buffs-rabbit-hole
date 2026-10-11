// @ts-check
/**
 * Movie Buff's Rabbit Hole — Manifest V3 Generator.
 */
export function createManifest({ dev = false } = {}) {
  return {
    manifest_version: 3,
    name: dev ? "Movie Buff's Rabbit Hole (Dev)" : "Movie Buff's Rabbit Hole",
    version: '1.0.0',
    description: "The cinephile's rabbit hole: says vs means frame analysis, quirky summaries, director's cut, themes, and ambient soundtracks while watching.",
    icons: {
      16: 'icons/icon-16.png',
      32: 'icons/icon-32.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png',
    },
    action: {
      default_title: "Movie Buff's Rabbit Hole",
      default_popup: 'popup.html',
      default_icon: {
        16: 'icons/icon-16.png',
        32: 'icons/icon-32.png',
        48: 'icons/icon-48.png',
        128: 'icons/icon-128.png',
      },
    },
    options_ui: {
      page: 'options.html',
      open_in_tab: true,
    },
    background: {
      service_worker: 'background.js',
      type: 'module',
    },
    content_scripts: [
      {
        matches: ['https://www.youtube.com/*', 'https://m.youtube.com/*'],
        js: ['content/youtube.js'],
        run_at: 'document_idle',
      },
      {
        matches: ['https://www.netflix.com/*'],
        js: ['content/netflix.js'],
        run_at: 'document_idle',
      },
    ],
    permissions: [
      'storage',
      'activeTab',
      'tabs',
    ],
    host_permissions: [
      'https://www.youtube.com/*',
      'https://m.youtube.com/*',
      'https://www.netflix.com/*',
      'https://*.reddit.com/*',
      'https://*.substack.com/*',
      'https://*.imdb.com/*',
      'https://*.rottentomatoes.com/*',
    ],
  };
}
