import React from 'react';

interface QuirkySummaryCardProps {
  source: string;
  quote: string;
  upvotes: number;
  takeaway: string;
}

export const QuirkySummaryCard: React.FC<QuirkySummaryCardProps> = ({
  source,
  quote,
  upvotes,
  takeaway,
}) => {
  return (
    <div className="quirky-banner">
      <div className="quirky-icon">🍿</div>
      <div className="quirky-content">
        <div className="quirky-header">
          <span>{source}</span>
          <span>▲ {(upvotes / 1000).toFixed(1)}k upvotes</span>
        </div>
        <p className="quirky-quote">"{quote}"</p>
        <p className="quirky-takeaway">{takeaway}</p>
      </div>
    </div>
  );
};
