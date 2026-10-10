/**
 * Background Service Worker for Movie Buff's Rabbit Hole.
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log("Movie Buff's Rabbit Hole extension installed.");
});

// Update badge when user navigates to YouTube or Netflix
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    if (tab.url.includes('youtube.com/watch') || tab.url.includes('netflix.com/watch')) {
      chrome.action.setBadgeText({ tabId, text: '🎬' });
      chrome.action.setBadgeBackgroundColor({ tabId, color: '#e11d48' });
    } else {
      chrome.action.setBadgeText({ tabId, text: '' });
    }
  }
});
