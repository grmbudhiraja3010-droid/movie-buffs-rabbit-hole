import React, { useState } from 'react';
import type { DiscussionQuote, DebateControversy, RedditDiscussion, SubstackEssay } from '../types/movie';

interface DiscussionsCardProps {
  discussions: {
    quotes: DiscussionQuote[];
    debates: DebateControversy[];
    redditThreads: RedditDiscussion[];
    substackEssays: SubstackEssay[];
  };
}

export const DiscussionsCard: React.FC<DiscussionsCardProps> = ({ discussions }) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'debates' | 'reddit' | 'substack'>('quotes');
  const [debateSort, setDebateSort] = useState<'relevancy' | 'latest'>('relevancy');

  const sortedDebates = [...discussions.debates].sort((a, b) => {
    if (debateSort === 'relevancy') {
      return b.relevancyScore - a.relevancyScore;
    }
    return b.latestDate.localeCompare(a.latestDate);
  });

  return (
    <div className="rabbit-section">
      <div className="section-trigger" style={{ cursor: 'default' }}>
        <div className="section-trigger-title">
          <span className="section-icon">💬</span>
          <div>
            <h3 className="section-heading">Cultural Impact, Quotes & Discourse</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8' }}>
              Iconic quotes, debates ordered by relevancy, plus Reddit & Substack essays
            </p>
          </div>
        </div>
        <span className="section-badge">Fandoms & Debates</span>
      </div>

      <div className="section-body">
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', margin: '4px 0 14px', flexWrap: 'wrap' }}>
          <button
            className={`filter-pill ${activeTab === 'quotes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            “ ” Iconic Dialogue Quotes
          </button>
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
            🔥 Reddit Discussions ({discussions.redditThreads.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'substack' ? 'active' : ''}`}
            onClick={() => setActiveTab('substack')}
          >
            📰 Substack Essays ({discussions.substackEssays.length})
          </button>
        </div>

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {discussions.quotes.map((q, idx) => (
              <div
                key={idx}
                style={{
                  background: '#f8fafc',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  borderLeft: '3px solid var(--gold-500)',
                  border: '1px solid var(--border-light)',
                  borderLeftWidth: '3px',
                }}
              >
                <div style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-dark)', fontWeight: 600 }}>
                  "{q.quote}"
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  <span>Spoken by: <strong style={{ color: 'var(--text-dark)' }}>{q.speaker}</strong></span>
                  <span>{q.sceneContext}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-body)', marginTop: '4px' }}>
                  <strong>Cultural Use:</strong> {q.culturalUse}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Debates Tab */}
        {activeTab === 'debates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', alignSelf: 'center' }}>Sort By:</span>
              <button
                className={`filter-pill ${debateSort === 'relevancy' ? 'active' : ''}`}
                style={{ fontSize: '10.5px', padding: '2px 8px' }}
                onClick={() => setDebateSort('relevancy')}
              >
                Highest Relevancy Score
              </button>
              <button
                className={`filter-pill ${debateSort === 'latest' ? 'active' : ''}`}
                style={{ fontSize: '10.5px', padding: '2px 8px' }}
                onClick={() => setDebateSort('latest')}
              >
                Latest Discussion Date
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sortedDebates.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--crimson-500)',
                    border: '1px solid var(--border-light)',
                    borderLeftWidth: '3px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {d.topic}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        background: '#fff1f2',
                        color: 'var(--crimson-600)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      Relevancy: {d.relevancyScore}% • {d.latestDate}
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-body)', marginTop: '6px', lineHeight: '1.45' }}>
                    {d.summary}
                  </p>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <strong>Fanbase Divisions:</strong> {d.fanbaseSides}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reddit Threads Tab */}
        {activeTab === 'reddit' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {discussions.redditThreads.map((thread, idx) => (
              <a
                key={idx}
                href={thread.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-row"
              >
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{thread.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {thread.subreddit} • ▲ {thread.upvotes.toLocaleString()} upvotes • 💬 {thread.commentsCount} comments
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '10.5px',
                    padding: '2px 8px',
                    borderRadius: '99px',
                    background: thread.tag === 'Hot' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: thread.tag === 'Hot' ? '#f87171' : '#fbbf24',
                    fontWeight: 600,
                  }}
                >
                  {thread.tag} ↗
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Substack Essays Tab */}
        {activeTab === 'substack' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {discussions.substackEssays.map((essay, idx) => (
              <a
                key={idx}
                href={essay.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-row"
                style={{ flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{essay.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--crimson-600)', fontWeight: 600 }}>{essay.readTime} ↗</span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  by {essay.author} in <em>{essay.publication}</em>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-body)', marginTop: '4px', fontStyle: 'italic' }}>
                  "{essay.snippet}"
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
