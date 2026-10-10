/**
 * Background Service Worker for Movie Buff's Rabbit Hole.
 * - Handles offscreen audio lifecycle
 * - Stops audio immediately if the active page/URL changes
 * - Manages extension badges
 */

let lastActiveUrl = '';
let currentWatchedTabId: number | null = null;

// Ensure offscreen document is ready for audio
async function ensureOffscreenDocument() {
  if (typeof chrome !== 'undefined' && chrome.offscreen) {
    try {
      const existingContexts = await chrome.runtime.getContexts?.({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
      });
      if (existingContexts && existingContexts.length > 0) return;

      await chrome.offscreen.createDocument({
        url: 'offscreen.html',
        reasons: ['AUDIO_PLAYBACK'],
        justification: 'Play background movie soundtrack alongside tab video',
      });
    } catch {
      // already created or not supported
    }
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Movie Buff's Rabbit Hole extension installed.");
  void ensureOffscreenDocument();
});

chrome.runtime.onStartup.addListener(() => {
  void ensureOffscreenDocument();
});

// Forward audio requests to offscreen document
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'PLAY_SONG' || msg.type === 'STOP_SONG' || msg.type === 'SET_VOLUME' || msg.type === 'GET_AUDIO_STATUS') {
    ensureOffscreenDocument().then(() => {
      chrome.runtime.sendMessage(msg).then((res) => {
        sendResponse(res);
      }).catch((err) => {
        sendResponse({ error: err.message });
      });
    });
    return true; // Keep message channel open for async response
  }
});

// Stop audio if the page / URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Update badge
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('youtube.com/watch') || tab.url.includes('netflix.com/watch')) {
      chrome.action.setBadgeText({ tabId, text: '🎬' });
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#e11d48' });
    } else {
      chrome.action.setBadgeText({ tabId, text: '' });
    }
  }

  // If the user navigated to a different URL on the watched tab, stop the song!
  if (changeInfo.url && (tabId === currentWatchedTabId || lastActiveUrl)) {
    if (changeInfo.url !== lastActiveUrl) {
      lastActiveUrl = changeInfo.url;
      // Tell offscreen player to stop audio
      chrome.runtime.sendMessage({ type: 'STOP_AUDIO_PAGE_CHANGED' }).catch(() => {});
    }
  }
});

// When user switches tab, if they moved away from the watched tab, stop audio
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url && tab.url !== lastActiveUrl) {
      lastActiveUrl = tab.url;
      currentWatchedTabId = activeInfo.tabId;
      // Page changed: stop audio
      chrome.runtime.sendMessage({ type: 'STOP_AUDIO_PAGE_CHANGED' }).catch(() => {});
    }
  } catch {
    // Ignore tab lookup error
  }
});
