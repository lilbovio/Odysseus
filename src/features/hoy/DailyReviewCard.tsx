import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDailyReview, usePostponeReviewMutation } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const DailyReviewCard: React.FC = () => {
  const { data: review } = useDailyReview();
  const postponeMutation = usePostponeReviewMutation();
  const navigate = useNavigate();
  const [postponedMessage, setPostponedMessage] = useState(false);

  const handleStart = () => {
    navigate('/estudiar/quiz');
  };

  const handlePostpone = () => {
    postponeMutation.mutate(1, {
      onSuccess: () => {
        setPostponedMessage(true);
        setTimeout(() => setPostponedMessage(false), 3000);
      },
    });
  };

  return (
    <section className="bg-surface-container rounded-[28px] p-6 lg:p-8 flex flex-col justify-between shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] relative overflow-hidden min-h-[380px]">
      <div className="flex flex-col gap-6 z-10">
        {/* Card Header & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="school" size={24} className="text-primary-container" />
            <h2 className="font-headline-md text-xl lg:text-2xl text-on-surface font-semibold m-0">
              {strings.hoy.dailyReviewTitle}
            </h2>
          </div>
          <div className="clay-chip flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            <span className="font-citation text-xs text-on-surface font-medium">
              {review?.cardsCount || 12} tarjetas · {review?.estimatedMinutes || 15} min
            </span>
          </div>
        </div>

        {/* Description & Topics Box */}
        <div className="flex flex-col gap-3">
          <p className="font-body text-sm lg:text-base text-on-surface-variant leading-relaxed m-0">
            {strings.hoy.dailyReviewSubtitle}
          </p>

          <div className="p-4 rounded-[20px] bg-surface-container-low shadow-[inset_2px_3px_6px_rgba(0,0,0,0.5)] flex flex-col gap-1">
            <span className="font-citation text-[11px] text-outline uppercase tracking-wider">
              {strings.hoy.keyTopicsTitle}
            </span>
            <p className="font-body text-sm text-on-surface m-0">
              Garantías constitucionales{' '}
              <span className="text-on-surface-variant font-citation text-xs">
                (Derecho civil)
              </span>{' '}
              y Vías metabólicas{' '}
              <span className="text-on-surface-variant font-citation text-xs">
                (Bioquímica)
              </span>
              .
            </p>
          </div>
        </div>

        {/* Retention Metric Inline Visual */}
        <div className="flex items-center gap-6 pt-1">
          <div className="flex items-center gap-3">
            <svg className="w-10 h-10 -rotate-90 text-primary-container shrink-0" viewBox="0 0 36 36">
              <path
                className="text-surface-container-high"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="82, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-citation text-xs text-on-surface font-semibold">
                {strings.hoy.retentionStat}
              </span>
              <span className="font-body text-xs text-outline">
                {strings.hoy.retentionSub}
              </span>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-surface-variant" />

          <div className="flex flex-col">
            <span className="font-citation text-xs text-on-surface font-semibold">
              {strings.hoy.readyForExamStat}
            </span>
            <span className="font-body text-xs text-outline">
              {strings.hoy.readyForExamSub}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 z-10">
        <button
          type="button"
          onClick={handleStart}
          className="clay-btn-primary h-12 px-6 flex items-center justify-center gap-2 rounded-[20px] text-on-primary-fixed font-body text-sm font-semibold cursor-pointer transition-transform"
        >
          <Icon name="play_arrow" size={20} className="text-on-primary-fixed" />
          <span>{strings.hoy.startReviewBtn}</span>
        </button>

        <button
          type="button"
          onClick={handlePostpone}
          disabled={postponeMutation.isPending}
          className="clay-chip h-12 px-5 flex items-center justify-center gap-2 rounded-[20px] bg-surface-container-high text-on-surface-variant hover:text-on-surface font-body text-sm font-medium cursor-pointer transition-colors"
        >
          <Icon name="schedule" size={18} className="text-on-surface-variant" />
          <span>{postponedMessage ? 'Pospuesto 1 hora' : strings.hoy.postponeBtn}</span>
        </button>
      </div>
    </section>
  );
};
