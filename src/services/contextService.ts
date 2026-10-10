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

const MOVIE_KEYWORD_REGEX = /\b(trailer|official trailer|teaser|movie|clip|film|scene|ending explained|review|soundtrack|ost|cinema|directed by|starring)\b/i;
const YEAR_REGEX = /\b(19\d\d|20[0-2]\d)\b/;

export function isMovieContent(title: string, url = ''): boolean {
  if (url.includes('netflix.com')) return true;

  const lower = title.toLowerCase();
  if (lower.includes('inception') || lower.includes('parasite') || lower.includes('oppenheimer')) {
    return true;
  }
  if (MOVIE_KEYWORD_REGEX.test(lower) || YEAR_REGEX.test(lower)) {
    return true;
  }
  return false;
}

export async function detectCurrentMovie(requestedMovieId?: string | null): Promise<ActiveContext> {
  // If a specific movie ID or title was requested (e.g. from URL query param when expanded)
  if (requestedMovieId) {
    const data = getMovieData(requestedMovieId);
    return {
      platform: 'search',
      contentType: 'movie',
      title: data.title,
      isWatching: false,
      movieData: data,
    };
  }

  // Check persisted storage so opening/expanding does not reset to default
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    try {
      const stored = (await chrome.storage.local.get(['lastActiveMovieId', 'lastVideoType', 'lastWatchedUrl'])) as {
        lastActiveMovieId?: string;
        lastVideoType?: 'movie' | 'general_video';
        lastWatchedUrl?: string;
      };
      if (stored.lastActiveMovieId) {
        const data = stored.lastVideoType === 'general_video'
          ? getGeneralVideoData(stored.lastActiveMovieId)
          : getMovieData(stored.lastActiveMovieId);
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
      // Continue to live tab detection
    }
  }

  // Query active Chrome tab
  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        const url = tab.url;

        // YouTube detection
        if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
          const rawTitle = tab.title?.replace(/ - YouTube$/, '').trim() || 'Online Video';
          const isMovie = isMovieContent(rawTitle, url);

          if (isMovie) {
            const cleanTitle = rawTitle
              .replace(/\b(Official Trailer|Trailer|Clip|Scene|Movie Clip|4K|Teaser)\b/gi, '')
              .replace(/[[\]()]/g, '')
              .trim();
            const movieData = getMovieData(cleanTitle || rawTitle);
            return {
              platform: 'youtube',
              contentType: 'movie',
              title: cleanTitle || rawTitle,
              sourceUrl: url,
              isWatching: true,
              movieData,
            };
          } else {
            // General Video: omit irrelevant movie sections
            const videoData = getGeneralVideoData(rawTitle);
            return {
              platform: 'youtube',
              contentType: 'general_video',
              title: rawTitle,
              sourceUrl: url,
              isWatching: true,
              movieData: videoData,
            };
          }
        }

        // Netflix detection
        if (url.includes('netflix.com/watch') || url.includes('netflix.com/title')) {
          const rawTitle = tab.title?.replace(/ - Netflix$/, '').replace(/^Watch /, '').trim() || 'Parasite';
          return {
            platform: 'netflix',
            contentType: 'movie',
            title: rawTitle,
            sourceUrl: url,
            isWatching: true,
            movieData: getMovieData(rawTitle),
          };
        }
      }
    } catch {
      // Fall through to default
    }
  }

  // Default demo active state
  return {
    platform: 'demo',
    contentType: 'movie',
    title: 'Inception',
    isWatching: true,
    movieData: CURATED_MOVIES.inception,
  };
}
