/**
 * Background Service Worker for Movie Buff's Rabbit Hole.
 * - Detects video playback tabs (YouTube, Netflix) and sets badges
 * - Listens for extension events
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log("Movie Buff's Rabbit Hole extension installed.");
});

// Update badge when on video tabs
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('youtube.com/watch') || tab.url.includes('netflix.com/watch') || tab.url.includes('netflix.com/title')) {
      chrome.action.setBadgeText({ tabId, text: '🎬' });
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#be123c' });
    } else {
      chrome.action.setBadgeText({ tabId, text: '' });
    }
  }
});
