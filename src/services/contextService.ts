/**
 * Context Service: Detects current movie or general video playing on YouTube or Netflix,
 * or retrieves persisted state so expansions stay intact.
 */
import { getMovieData, getGeneralVideoData, CURATED_MOVIES } from '../data/movies';
import type { MovieBuffData } from '../types/movie';

export interface ActiveContext {
  platform: 'netflix' | 'youtube' | 'search' | 'demo';
  contentType: 'movie' | 'general_video';
  title: string;
  sourceUrl?: string;
  isWatching: boolean;
  movieData: MovieBuffData;
}

const MOVIE_KEYWORD_REGEX = /\b(official trailer|trailer|teaser|movie|clip|film|scene|ending explained|cinema|directed by|starring|full movie|cinephile)\b/i;
const YEAR_REGEX = /\b(19\d\d|20[0-2]\d)\b/;

/**
 * Sanitizes a title string to ensure clean human-readable text without compounding dyn_ prefixes.
 */
export function sanitizeTitle(raw: string): string {
  if (!raw) return 'Inception';
  let cleaned = raw
    .replace(/^dyn_+/gi, '')
    .replace(/\b(Official Trailer|Trailer|Teaser|Movie Clip|Clip|Scene|4K UHD|4K|1080p|HD|Official Music Video)\b/gi, '')
    .replace(/[[\]()]/g, '')
    .replace(/[_-]+/g, ' ')
    .trim();

  // If title was stripped to empty, return fallback
  return cleaned || 'Inception';
}

export function isMovieContent(title: string, url = ''): boolean {
  if (url.includes('netflix.com')) return true;

  const lower = title.toLowerCase();
  const knownMovies = ['inception', 'parasite', 'oppenheimer', 'interstellar', 'dark knight', 'dune', 'pulp fiction', 'godfather', 'matrix', 'whiplash', 'blade runner'];
  if (knownMovies.some((m) => lower.includes(m))) {
    return true;
  }
  if (MOVIE_KEYWORD_REGEX.test(lower) || YEAR_REGEX.test(lower)) {
    return true;
  }
  return false;
}

export async function detectCurrentMovie(requestedMovieId?: string | null, requestedContentType?: string | null): Promise<ActiveContext> {
  // 1. If explicit query parameter was provided (e.g. from expanded tab or manual selection)
  if (requestedMovieId) {
    const cleanId = sanitizeTitle(requestedMovieId);
    const isGeneral = requestedContentType === 'general_video' || (!isMovieContent(cleanId) && requestedContentType !== 'movie');
    const data = isGeneral ? getGeneralVideoData(cleanId) : getMovieData(cleanId);
    return {
      platform: 'search',
      contentType: isGeneral ? 'general_video' : 'movie',
      title: data.title,
      isWatching: false,
      movieData: data,
    };
  }

  // 2. Query active Chrome tab FIRST (so any playing video is immediately recognized)
  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        const url = tab.url;

        // YouTube detection
        if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
          let videoTitle = '';
          let channel = '';

          // Try asking YouTube content script for real DOM title
          if (tab.id) {
            try {
              const res = await chrome.tabs.sendMessage(tab.id, { type: 'GET_WATCHING_INFO' });
              if (res && res.title) {
                videoTitle = res.title;
              }
            } catch {
              // Content script not ready yet, fallback to tab title
            }
          }

          if (!videoTitle && tab.title) {
            videoTitle = tab.title.replace(/ - YouTube$/, '').trim();
          }

          const clean = sanitizeTitle(videoTitle || 'YouTube Video');
          const isMovie = isMovieContent(videoTitle, url);

          if (isMovie) {
            const movieData = getMovieData(clean);
            return {
              platform: 'youtube',
              contentType: 'movie',
              title: movieData.title,
              sourceUrl: url,
              isWatching: true,
              movieData,
            };
          } else {
            const videoData = getGeneralVideoData(clean, channel || undefined);
            return {
              platform: 'youtube',
              contentType: 'general_video',
              title: videoData.title,
              sourceUrl: url,
              isWatching: true,
              movieData: videoData,
            };
          }
        }

        // Netflix detection
        if (url.includes('netflix.com/watch') || url.includes('netflix.com/title')) {
          let netflixTitle = '';
          if (tab.id) {
            try {
              const res = await chrome.tabs.sendMessage(tab.id, { type: 'GET_WATCHING_INFO' });
              if (res && res.title) netflixTitle = res.title;
            } catch {
              // fallback
            }
          }

          if (!netflixTitle && tab.title) {
            netflixTitle = tab.title.replace(/ - Netflix$/, '').replace(/^Watch /, '').trim();
          }

          const clean = sanitizeTitle(netflixTitle || 'Parasite');
          const movieData = getMovieData(clean);
          return {
            platform: 'netflix',
            contentType: 'movie',
            title: movieData.title,
            sourceUrl: url,
            isWatching: true,
            movieData,
          };
        }
      }
    } catch {
      // Continue to storage
    }
  }

  // 3. Fallback to stored state (when opened on a new tab or general non-video web page)
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    try {
      const stored = (await chrome.storage.local.get(['lastActiveTitle', 'lastVideoType', 'lastWatchedUrl'])) as {
        lastActiveTitle?: string;
        lastVideoType?: 'movie' | 'general_video';
        lastWatchedUrl?: string;
      };
      if (stored.lastActiveTitle) {
        const cleanStored = sanitizeTitle(stored.lastActiveTitle);
        const data = stored.lastVideoType === 'general_video'
          ? getGeneralVideoData(cleanStored)
          : getMovieData(cleanStored);
        return {
          platform: 'search',
          contentType: stored.lastVideoType || 'movie',
          title: data.title,
          sourceUrl: stored.lastWatchedUrl,
          isWatching: !!stored.lastWatchedUrl,
          movieData: data,
        };
      }
    } catch {
      // Fallback
    }
  }

  // 4. Default demo state: Inception
  return {
    platform: 'demo',
    contentType: 'movie',
    title: 'Inception',
    isWatching: true,
    movieData: CURATED_MOVIES.inception,
  };
}
