import React from 'react';
import { useStreakDays } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const WeeklyStreakStrip: React.FC = () => {
  const { data } = useStreakDays();
  const days = data?.days || [];

  return (
    <div className="flex flex-col items-start lg:items-end gap-1.5">
      {/* Visual Days Capsule */}
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container-high shadow-[inset_2px_3px_6px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 px-1">
          {days.map((d, idx) => (
            <div key={`${d.letter}-${idx}`} className="flex flex-col items-center gap-1">
              <span
                className={`font-citation text-[10px] font-medium ${
                  d.isToday ? 'text-primary-container font-bold' : 'text-outline'
                }`}
              >
                {d.letter}
              </span>

              {d.isToday ? (
                <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center p-[2px] bg-surface-container-high shadow-[inset_1px_1px_3px_rgba(0,0,0,0.7)]">
                  <span className="w-2 h-2 rounded-full bg-primary-container" />
                </div>
              ) : d.completed ? (
                <span className="w-3 h-3 rounded-full bg-primary-container shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
              ) : (
                <span className="w-3 h-3 rounded-full bg-surface-variant opacity-60" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Label */}
      <span className="font-citation text-xs text-on-surface-variant tracking-normal">
        {strings.hoy.streakTitle} · {strings.hoy.streakSubtitle(data?.currentStreak || 5)}
      </span>
    </div>
  );
};
