/**
 * Netflix content script for Movie Buff's Rabbit Hole.
 * Detects current title, episode tag, and playback time.
 */

function getNetflixInfo() {
  const titleEl = document.querySelector('[data-uia="video-title"], .video-title');
  const title = titleEl?.textContent?.trim() || document.title.replace(/ - Netflix$/, '').trim();
  const video = document.querySelector('video') as HTMLVideoElement | null;

  return {
    title,
    currentTime: video ? Math.floor(video.currentTime) : 0,
    duration: video ? Math.floor(video.duration) : 0,
    paused: video ? video.paused : true,
  };
}

if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req.type === 'GET_WATCHING_INFO') {
      sendResponse(getNetflixInfo());
    }
  });
}
