import React, { useState } from 'react';
import type { ReviewItem } from '../types/movie';

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
  // Max 3 filters: All, Critics, Audience
  const [filterType, setFilterType] = useState<'all' | 'critic' | 'audience'>('all');

  if (!reviews || reviews.length === 0) return null;

  const filteredReviews = reviews.filter((r) => {
    if (filterType !== 'all' && r.type !== filterType) return false;
    return true;
  });

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">⭐</span>
          <div>
            <h3 className="section-heading">Cinephile Reviews & Sentiment</h3>
          </div>
        </div>
        <span className="section-badge">Scoreboard</span>
      </div>

      <div className="section-body">
        {/* Aggregated Overview */}
        <div className="ratings-grid" style={{ marginBottom: '12px' }}>
          {ratings.rottenTomatoesCritics > 0 && (
            <div className="rating-chip rt">
              <span style={{ fontSize: '18px' }}>🍅</span>
              <div>
                <div className="score">{ratings.rottenTomatoesCritics}%</div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>RT Critics</div>
              </div>
            </div>
          )}

          {ratings.rottenTomatoesAudience > 0 && (
            <div className="rating-chip rt">
              <span style={{ fontSize: '18px' }}>🍿</span>
              <div>
                <div className="score">{ratings.rottenTomatoesAudience}%</div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>RT Audience</div>
              </div>
            </div>
          )}

          {ratings.imdbRating > 0 && (
            <div className="rating-chip imdb">
              <span style={{ fontSize: '18px' }}>⭐</span>
              <div>
                <div className="score">{ratings.imdbRating}/10</div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>IMDb ({ratings.imdbVotes})</div>
              </div>
            </div>
          )}

          {ratings.specialized?.score && (
            <div className="rating-chip spec">
              <span style={{ fontSize: '18px' }}>🎬</span>
              <div>
                <div className="score" style={{ fontSize: '13px' }}>{ratings.specialized.score}</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>{ratings.specialized.platform}</div>
              </div>
            </div>
          )}
        </div>

        {/* Max 3 Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {(['all', 'critic', 'audience'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`filter-pill ${filterType === t ? 'active' : ''}`}
            >
              {t === 'all' ? 'All Reviews' : t === 'critic' ? '✍️ Critics' : '🍿 Audience'}
            </button>
          ))}
        </div>

        {/* Review Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-top-meta">
                <div>
                  <span className="author-name">{rev.author}</span>
                  {rev.publication && (
                    <span style={{ color: '#64748b', fontSize: '11px', marginLeft: '6px' }}>
                      ({rev.publication})
                    </span>
                  )}
                </div>
                <span className={`sentiment-badge ${rev.sentiment.toLowerCase()}`}>
                  ★ {rev.score}/5 · {rev.sentiment}
                </span>
              </div>
              <p className="review-quote-text">"{rev.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#94a3b8' }}>
                <span>Source: {rev.source}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
