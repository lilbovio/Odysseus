import React from 'react';
import { useUpcomingDeliveries } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';

export const UpcomingDeliveriesCard: React.FC = () => {
  const { data: deliveries = [] } = useUpcomingDeliveries();

  return (
    <section className="bg-surface-container rounded-[28px] p-6 lg:p-8 flex flex-col gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] min-h-[380px]">
      {/* Section Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-xl lg:text-2xl text-on-surface font-semibold tracking-tight m-0">
            {strings.hoy.upcomingTitle}
          </h2>
          <span className="font-citation text-xs text-outline">
            {strings.hoy.pendingCount(deliveries.length)}
          </span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="w-2 h-2 rounded-full bg-primary-container shadow-[0_0_6px_#5ce0b8]" />
          <span className="font-citation text-xs text-on-surface-variant">
            {strings.hoy.classroomSynced}
          </span>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="flex flex-col gap-3">
        {deliveries.map((item) => {
          let badgeClass = 'bg-surface-container-high text-on-surface-variant';
          if (item.badgeType === 'coral') {
            badgeClass = 'bg-[#FF8A6B]/20 text-[#FF8A6B]';
          } else if (item.badgeType === 'amber') {
            badgeClass = 'bg-secondary/20 text-secondary';
          }

          return (
            <div
              key={item.id}
              className="p-4 rounded-[20px] bg-surface-container-low shadow-[inset_2px_3px_6px_rgba(0,0,0,0.5)] flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  style={{ backgroundColor: item.colorDot }}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-body text-sm text-on-surface font-semibold truncate">
                    {item.title}
                  </span>
                  <span className="font-citation text-xs text-on-surface-variant truncate">
                    {item.subjectName}
                  </span>
                </div>
              </div>
              <div className={`shrink-0 px-2.5 py-1 rounded-full font-citation text-[11px] font-semibold ${badgeClass}`}>
                {item.dueBadge}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
