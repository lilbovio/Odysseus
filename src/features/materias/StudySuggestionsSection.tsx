import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudySuggestions } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const StudySuggestionsSection: React.FC = () => {
  const { data: suggestions = [] } = useStudySuggestions();
  const navigate = useNavigate();

  return (
    <div className="lg:col-span-2 p-6 rounded-[28px] bg-surface-container flex flex-col justify-between gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <span className="font-citation text-xs text-on-surface-variant uppercase tracking-wider">
          {strings.materias.studySuggestionsTitle}
        </span>
        <span className="font-citation text-xs text-secondary font-medium">
          {strings.materias.basedOnRetention}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suggestions.map((sug) => (
          <div
            key={sug.id}
            onClick={() => navigate('/estudiar/quiz')}
            className="p-4 rounded-[20px] bg-surface-container-high flex items-start gap-3 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-2px_-2px_4px_rgba(0,0,0,0.3)] cursor-pointer hover:bg-surface-variant transition-colors"
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-secondary shrink-0"
              style={{ backgroundColor: sug.badgeColor }}
            >
              <Icon name={sug.iconName} size={18} />
            </span>
            <div className="flex flex-col min-w-0">
              <span className="font-body text-sm font-semibold text-on-surface truncate">
                {sug.title}
              </span>
              <span className="font-body text-xs text-on-surface-variant line-clamp-2 mt-0.5">
                {sug.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-white/[0.04]">
        <span>{strings.materias.recalcNote}</span>
        <button
          type="button"
          onClick={() => navigate('/estudiar')}
          className="text-primary-container hover:underline font-body text-xs font-semibold cursor-pointer"
        >
          {strings.materias.fullSchedule}
        </button>
      </div>
    </div>
  );
};
