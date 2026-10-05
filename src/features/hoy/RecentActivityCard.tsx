import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecentActivity } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const RecentActivitySection: React.FC = () => {
  const { data: activity } = useRecentActivity();
  const navigate = useNavigate();

  if (!activity) return null;

  return (
    <section className="flex flex-col gap-4 w-full pt-2">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-xl lg:text-2xl text-on-surface font-semibold tracking-tight m-0">
          {strings.hoy.continueWhereLeft}
        </h2>
        <span className="font-citation text-xs text-outline">
          {strings.hoy.recentActivity}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Card 1: Last Query */}
        <div className="bg-surface-container rounded-[28px] p-6 flex flex-col justify-between gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-primary-container">
                <Icon name="forum" size={18} className="text-primary-container" />
                <span className="font-citation text-[11px] uppercase tracking-wider text-outline">
                  {strings.hoy.lastQueryTitle}
                </span>
              </div>
              <span className="font-citation text-xs text-outline">
                {activity.lastQuery.timeAgo}
              </span>
            </div>

            <h3 className="font-headline-md text-lg text-on-surface font-semibold pt-1 m-0">
              {activity.lastQuery.title}
            </h3>
            <p className="font-body text-sm text-on-surface-variant m-0">
              {activity.lastQuery.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
            <span className="font-citation text-xs text-outline">
              {strings.hoy.sourcesCount(activity.lastQuery.sourcesCount)}
            </span>
            <button
              type="button"
              onClick={() => navigate('/preguntar')}
              className="clay-chip h-9 px-4 rounded-[16px] bg-surface-container-high text-on-surface font-body text-xs font-medium hover:text-primary-container flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>{strings.hoy.openQueryBtn}</span>
              <Icon name="arrow_outward" size={16} />
            </button>
          </div>
        </div>

        {/* Card 2: Last Quiz */}
        <div className="bg-surface-container rounded-[28px] p-6 flex flex-col justify-between gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-secondary">
                <Icon name="quiz" size={18} className="text-secondary" />
                <span className="font-citation text-[11px] uppercase tracking-wider text-outline">
                  {strings.hoy.quickQuizTitle}
                </span>
              </div>
              <span className="font-citation text-xs text-secondary font-medium">
                {activity.lastQuiz.scoreFraction}
              </span>
            </div>

            <h3 className="font-headline-md text-lg text-on-surface font-semibold pt-1 m-0">
              {activity.lastQuiz.title}
            </h3>
            <p className="font-body text-sm text-on-surface-variant m-0">
              {activity.lastQuiz.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
            <span className="font-citation text-xs text-[#FF8A6B]">
              {strings.hoy.reviewErrorsBtn(activity.lastQuiz.errorsCount)}
            </span>
            <button
              type="button"
              onClick={() => navigate('/estudiar/quiz')}
              className="clay-chip h-9 px-4 rounded-[16px] bg-surface-container-high text-on-surface font-body text-xs font-medium hover:text-secondary flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>{strings.hoy.reviewErrorsAction}</span>
              <Icon name="restart_alt" size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
