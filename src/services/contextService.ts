/**
 * Context Service: Detects current movie playing on YouTube or Netflix,
 * or parses search queries.
 */
import { getMovieData, CURATED_MOVIES } from '../data/movies';
import type { MovieBuffData } from '../types/movie';

export interface ActiveContext {
  platform: 'netflix' | 'youtube' | 'search' | 'demo';
  title: string;
  sourceUrl?: string;
  isWatching: boolean;
  movieData: MovieBuffData;
}

export async function detectCurrentMovie(): Promise<ActiveContext> {
  // Check if running inside Chrome extension
  if (typeof chrome !== 'undefined' && chrome.tabs?.query) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        const url = tab.url;

        // YouTube detection
        if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
          const rawTitle = tab.title?.replace(/ - YouTube$/, '').trim() || 'Inception';
          // Clean title if it contains "Trailer", "Clip", etc.
          const cleanTitle = rawTitle
            .replace(/\b(Official Trailer|Trailer|Clip|Scene|Movie Clip|4K|Teaser)\b/gi, '')
            .replace(/[[\]()]/g, '')
            .trim();

          return {
            platform: 'youtube',
            title: cleanTitle || rawTitle,
            sourceUrl: url,
            isWatching: true,
            movieData: getMovieData(cleanTitle || rawTitle),
          };
        }

        // Netflix detection
        if (url.includes('netflix.com/watch') || url.includes('netflix.com/title')) {
          const rawTitle = tab.title?.replace(/ - Netflix$/, '').replace(/^Watch /, '').trim() || 'Parasite';
          return {
            platform: 'netflix',
            title: rawTitle,
            sourceUrl: url,
            isWatching: true,
            movieData: getMovieData(rawTitle),
          };
        }
      }
    } catch {
      // Fall through to demo default
    }
  }

  // Default demo active state
  return {
    platform: 'demo',
    title: 'Inception',
    isWatching: true,
    movieData: CURATED_MOVIES.inception,
  };
}
