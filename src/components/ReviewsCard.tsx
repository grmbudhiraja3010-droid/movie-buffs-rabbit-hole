import React, { useState } from 'react';
import type { ReviewItem, ReviewFilter, ReviewSourceFilter } from '../types/movie';

interface ReviewsCardProps {
  reviews: ReviewItem[];
  ratings: {
    rottenTomatoesCritics: number;
    rottenTomatoesAudience: number;
    imdbRating: number;
    imdbVotes: string;
    specialized: {
      platform: string;
      score: string;
      badge: string;
    };
  };
}

export const ReviewsCard: React.FC<ReviewsCardProps> = ({ reviews, ratings }) => {
  const [filterRating, setFilterRating] = useState<ReviewFilter>('all');
  const [filterType, setFilterType] = useState<'all' | 'critic' | 'audience'>('all');
  const [filterSource, setFilterSource] = useState<ReviewSourceFilter>('all');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating !== 'all' && r.starsCategory !== filterRating) return false;
    if (filterType !== 'all' && r.type !== filterType) return false;
    if (filterSource !== 'all' && r.source !== filterSource) return false;
    return true;
  });

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">⭐</span>
          <div>
            <h3 className="section-heading">Cinephile Reviews & Sentiment</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Critics vs. Normal Audience across Rotten Tomatoes, IMDb & specialized journals
            </p>
          </div>
        </div>
        <span className="section-badge">Sort & Filter</span>
      </div>

      <div className="section-body">
        {/* Aggregated Overview */}
        <div className="ratings-grid" style={{ marginTop: '4px', marginBottom: '14px' }}>
          <div className="rating-chip rt">
            <span style={{ fontSize: '18px' }}>🍅</span>
            <div>
              <div className="score">{ratings.rottenTomatoesCritics}%</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>RT Critics</div>
            </div>
          </div>

          <div className="rating-chip rt">
            <span style={{ fontSize: '18px' }}>🍿</span>
            <div>
              <div className="score">{ratings.rottenTomatoesAudience}%</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>Audience Score</div>
            </div>
          </div>

          <div className="rating-chip imdb">
            <span style={{ fontSize: '18px' }}>⭐️</span>
            <div>
              <div className="score">{ratings.imdbRating} / 10</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>IMDb ({ratings.imdbVotes})</div>
            </div>
          </div>

          <div className="rating-chip special">
            <span style={{ fontSize: '18px' }}>🏛️</span>
            <div>
              <div className="score">{ratings.specialized.score}</div>
              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{ratings.specialized.platform}</div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="review-filters">
          <span style={{ fontSize: '11px', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>
            Rating Tier:
          </span>
          <button
            className={`filter-pill ${filterRating === 'all' ? 'active' : ''}`}
            onClick={() => setFilterRating('all')}
          >
            All Ratings
          </button>
          <button
            className={`filter-pill ${filterRating === 'best' ? 'active' : ''}`}
            onClick={() => setFilterRating('best')}
          >
            Best (5★ / Raves)
          </button>
          <button
            className={`filter-pill ${filterRating === 'mid' ? 'active' : ''}`}
            onClick={() => setFilterRating('mid')}
          >
            Mid (3★ / Mixed)
          </button>
          <button
            className={`filter-pill ${filterRating === 'worst' ? 'active' : ''}`}
            onClick={() => setFilterRating('worst')}
          >
            Worst (&lt;3★ / Critical)
          </button>
        </div>

        <div className="review-filters" style={{ marginTop: '0px' }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', alignSelf: 'center', marginRight: '4px' }}>
            Audience:
          </span>
          <button
            className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All Voices
          </button>
          <button
            className={`filter-pill ${filterType === 'critic' ? 'active' : ''}`}
            onClick={() => setFilterType('critic')}
          >
            Certified Critics
          </button>
          <button
            className={`filter-pill ${filterType === 'audience' ? 'active' : ''}`}
            onClick={() => setFilterType('audience')}
          >
            Normal Audience
          </button>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredReviews.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: '#94a3b8' }}>
              No reviews match this specific tier filter.
            </div>
          ) : (
            filteredReviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">
                    {r.author} {r.publication && <span style={{ color: '#94a3b8', fontWeight: 400 }}>({r.publication})</span>}
                  </span>
                  <div className="review-stars">
                    <span style={{ color: '#f59e0b', marginRight: '6px' }}>
                      {'★'.repeat(Math.round(r.score))}
                      {'☆'.repeat(5 - Math.round(r.score))}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>{r.source}</span>
                  </div>
                </div>
                <p className="review-quote">"{r.text}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#64748b' }}>
                  <span>Sentiment: <strong>{r.sentiment}</strong></span>
                  <span>{r.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
