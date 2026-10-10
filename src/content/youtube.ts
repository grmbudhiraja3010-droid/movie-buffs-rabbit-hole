/**
 * YouTube content script for Movie Buff's Rabbit Hole.
 * Detects current video title, channel, and playback time.
 */

function getYouTubeInfo() {
  const titleEl = document.querySelector('h1.ytd-watch-metadata yt-formatted-string, #title h1');
  const rawTitle = titleEl?.textContent?.trim() || document.title.replace(/ - YouTube$/, '').trim();
  const video = document.querySelector('video') as HTMLVideoElement | null;

  return {
    title: rawTitle,
    currentTime: video ? Math.floor(video.currentTime) : 0,
    duration: video ? Math.floor(video.duration) : 0,
    paused: video ? video.paused : true,
  };
}

if (typeof chrome !== 'undefined' && chrome.runtime?.onMessage) {
  chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
    if (req.type === 'GET_WATCHING_INFO') {
      sendResponse(getYouTubeInfo());
    }
  });
}
