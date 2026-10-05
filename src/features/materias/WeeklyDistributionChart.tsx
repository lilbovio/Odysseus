import React from 'react';
import { useWeeklyDistribution } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const WeeklyDistributionChart: React.FC = () => {
  const { data: dist } = useWeeklyDistribution();

  if (!dist) return null;

  return (
    <div className="p-6 rounded-[28px] bg-surface-container flex flex-col justify-between gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between">
        <span className="font-citation text-xs text-on-surface-variant uppercase tracking-wider">
          {strings.materias.weeklyDistribution}
        </span>
        <Icon name="query_stats" size={18} className="text-outline" />
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-headline-lg text-2xl text-on-surface font-semibold">
            {dist.totalHours} h
          </span>
          <span className="font-citation text-xs text-primary-container font-medium">
            {dist.comparisonText}
          </span>
        </div>
        <p className="font-body text-xs text-on-surface-variant mt-1 m-0">
          {dist.description}
        </p>
      </div>

      {/* Bar Chart Visual */}
      <div className="flex items-end gap-2 h-16 pt-2">
        {dist.days.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center gap-1 h-full justify-end"
          >
            <div
              className={`w-full rounded-t-md transition-all ${
                item.isToday
                  ? 'bg-primary-container shadow-[inset_1px_1px_2px_rgba(255,255,255,0.2)]'
                  : 'bg-surface-container-high'
              }`}
              style={{ height: `${item.heightPercent}%` }}
              title={`${item.dayLabel}: ${item.heightPercent}%`}
            />
            <span className="font-citation text-[10px] text-outline">
              {item.dayLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
