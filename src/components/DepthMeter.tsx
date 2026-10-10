import React from 'react';

interface DepthMeterProps {
  currentLevel: number; // 1 to 5
  onSelectLevel?: (level: number) => void;
}

const LEVELS = [
  { level: 1, label: 'Surface Buzz' },
  { level: 2, label: 'Frame Subtext' },
  { level: 3, label: 'Cast & Director Vault' },
  { level: 4, label: 'Thematic Abyss' },
  { level: 5, label: 'Alternate Realities' },
];

export const DepthMeter: React.FC<DepthMeterProps> = ({ currentLevel, onSelectLevel }) => {
  return (
    <div className="depth-meter-bar">
      <span>🐇 Rabbit Hole Depth: <strong>{LEVELS[currentLevel - 1]?.label || 'Exploring'}</strong></span>
      <div className="depth-steps">
        {LEVELS.map((item) => (
          <button
            key={item.level}
            className={`depth-dot ${currentLevel >= item.level ? 'active' : ''}`}
            onClick={() => onSelectLevel?.(item.level)}
            title={`Dive to ${item.label}`}
            style={{ border: 'none', cursor: 'pointer', padding: 0 }}
          />
        ))}
      </div>
    </div>
  );
};
