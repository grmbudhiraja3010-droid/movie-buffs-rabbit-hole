import React, { useState } from 'react';
import type { DebateControversy, RedditDiscussion, SubstackEssay } from '../types/movie';

interface DiscussionsCardProps {
  discussions: {
    debates: DebateControversy[];
    redditThreads: RedditDiscussion[];
    substackEssays: SubstackEssay[];
  };
}

export const DiscussionsCard: React.FC<DiscussionsCardProps> = ({ discussions }) => {
  // Max 3 tabs, dialogue/quotes removed per Instruction 13
  const [activeTab, setActiveTab] = useState<'debates' | 'reddit' | 'substack'>('debates');

  if (!discussions) return null;

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">💬</span>
          <div>
            <h3 className="section-heading">Community Discussions & Discourse</h3>
          </div>
        </div>
        <span className="section-badge">Discussions</span>
      </div>

      <div className="section-body">
        {/* Navigation Tabs - Exactly 3 tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <button
            className={`filter-pill ${activeTab === 'debates' ? 'active' : ''}`}
            onClick={() => setActiveTab('debates')}
          >
            ⚖️ Debates & Controversies
          </button>
          <button
            className={`filter-pill ${activeTab === 'reddit' ? 'active' : ''}`}
            onClick={() => setActiveTab('reddit')}
          >
            🔥 Reddit Threads ({discussions.redditThreads.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'substack' ? 'active' : ''}`}
            onClick={() => setActiveTab('substack')}
          >
            📰 Substack Essays ({discussions.substackEssays.length})
          </button>
        </div>

        {/* Debates Tab */}
        {activeTab === 'debates' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {discussions.debates.map((d, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13.5px' }}>
                    {d.topic}
                  </span>
                  {d.exploreUrl && (
                    <a
                      href={d.exploreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="explore-link-btn"
                    >
                      Explore Debate ↗
                    </a>
                  )}
                </div>
                <p style={{ fontSize: '12.5px', color: '#334155', marginTop: '4px', lineHeight: '1.4' }}>
                  {d.summary}
                </p>
                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '6px' }}>
                  <strong>Sides:</strong> {d.fanbaseSides}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reddit Tab */}
        {activeTab === 'reddit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {discussions.redditThreads.map((t, idx) => (
              <a
                key={idx}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-row"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px' }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>
                    {t.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '3px' }}>
                    {t.subreddit} · ▲ {(t.upvotes / 1000).toFixed(1)}k upvotes · {t.commentsCount} comments
                  </div>
                </div>
                <span style={{ fontSize: '11.5px', color: '#be123c', fontWeight: 600 }}>
                  View on Reddit ↗
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Substack Tab */}
        {activeTab === 'substack' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {discussions.substackEssays.map((e, idx) => (
              <a
                key={idx}
                href={e.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-row"
                style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '12px 14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '13px' }}>
                    {e.title}
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#be123c', fontWeight: 600 }}>Read ↗</span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  {e.publication} · by {e.author} ({e.readTime})
                </div>
                <p style={{ fontSize: '12px', color: '#334155', marginTop: '2px' }}>
                  {e.snippet}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
