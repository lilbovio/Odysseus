import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { strings } from '../../locales/es-MX';
import { Icon } from '../ui/Icon';

interface FloatingQueryBarProps {
  className?: string;
}

export const FloatingQueryBar: React.FC<FloatingQueryBarProps> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSend = (text?: string) => {
    const q = (text !== undefined ? text : query).trim();
    if (!q) return;
    navigate(`/preguntar?q=${encodeURIComponent(q)}`);
    setQuery('');
  };

  const chips = [
    { label: strings.floatingPrompt.chips.quizMe, dotColor: '#5ce0b8' },
    { label: strings.floatingPrompt.chips.summarize, dotColor: '#f4be4e' },
    { label: strings.floatingPrompt.chips.pending, dotColor: '#ffbaa8' },
  ];

  return (
    <div
      className={`fixed bottom-5 left-0 lg:left-[240px] right-0 z-40 flex flex-col items-center pointer-events-none px-4 mb-16 lg:mb-0 ${className}`}
    >
      <div className="w-full max-w-2xl flex flex-col items-center gap-2 pointer-events-auto">
        {/* Main Floating Glass Capsule */}
        <div className="w-full flex items-center gap-3 px-3 py-2 rounded-full bg-white/[0.07] backdrop-blur-[22px] backdrop-saturate-[140%] border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <div className="flex-1 flex items-center gap-2.5 px-4 py-1.5 bg-surface rounded-full clay-input-inset border border-white/[0.08]">
            <Icon name="auto_awesome" size={18} className="text-primary-container shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder={strings.floatingPrompt.placeholder}
              className="w-full bg-transparent font-body text-xs md:text-sm text-on-surface placeholder:text-outline focus:outline-none min-w-0"
              aria-label={strings.floatingPrompt.placeholder}
            />
          </div>
          <button
            type="button"
            onClick={() => handleSend()}
            aria-label={strings.floatingPrompt.sendAria}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-primary-container text-on-primary-fixed hover:opacity-95 cursor-pointer shrink-0 transition-transform active:scale-95 shadow-sm"
          >
            <Icon name="arrow_forward" size={18} className="text-on-primary-fixed" />
          </button>
        </div>

        {/* Quick Suggestion Chips (Desktop and larger mobile screens) */}
        <div className="hidden sm:flex items-center justify-center flex-wrap gap-1.5">
          {chips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleSend(chip.label)}
              className="clay-chip flex items-center gap-1.5 px-3 py-1 bg-surface-container-high rounded-full border border-white/[0.06] text-on-surface-variant hover:text-on-surface cursor-pointer text-xs font-body transition-colors"
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: chip.dotColor }}
              />
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
