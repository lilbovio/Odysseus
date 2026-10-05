import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { strings } from '../../locales/es-MX';
import { WeeklyStreakStrip } from './WeeklyStreakStrip';
import { DailyReviewCard } from './DailyReviewCard';
import { UpcomingDeliveriesCard } from './UpcomingDeliveriesCard';
import { RecentActivitySection } from './RecentActivityCard';

export const HoyPage: React.FC = () => {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(' ')[0] : 'Juan';

  return (
    <div className="relative w-full max-w-[1380px] mx-auto flex flex-col gap-8 pb-10">
      {/* Decorative Solid Flat Shapes behind viewport for glass refraction (Strictly Solid, Zero Gradients) */}
      <div
        className="absolute -top-10 right-20 w-48 h-48 rounded-full bg-primary-container opacity-20 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-96 left-1/3 w-64 h-64 rounded-full bg-secondary opacity-15 pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full bg-tertiary-container opacity-20 pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Header & Consistency Strip */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 w-full pt-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface tracking-tight font-semibold m-0">
              {strings.hoy.greeting(userName)}
            </h1>
            <div className="flex sm:hidden items-center gap-1 px-2.5 py-0.5 bg-surface-container rounded-full shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-citation text-[10px] text-primary">{strings.app.focusedMode}</span>
            </div>
          </div>
          <p className="font-body text-base lg:text-lg text-on-surface-variant font-medium m-0">
            {strings.hoy.summary(2, 3)}
          </p>
        </div>

        {/* Weekly Consistency Strip */}
        <WeeklyStreakStrip />
      </header>

      {/* Main Grid: Repaso (7 cols) & Entregas (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        <div className="lg:col-span-7">
          <DailyReviewCard />
        </div>
        <div className="lg:col-span-5">
          <UpcomingDeliveriesCard />
        </div>
      </div>

      {/* Continúa donde lo dejaste */}
      <RecentActivitySection />
    </div>
  );
};
