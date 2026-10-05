import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeakSpots } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const EstudiarHubPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: weakSpots = [] } = useWeakSpots();

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1380px] mx-auto pb-16">
      {/* Page Title */}
      <header className="flex flex-col gap-1 pt-1">
        <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-semibold tracking-tight m-0">
          {strings.estudiar.title}
        </h1>
        <p className="font-body text-sm text-on-surface-variant m-0">
          Selecciona una modalidad de consolidación o continúa tu evaluación en curso.
        </p>
      </header>

      {/* 3 Modes Grid (from Desktop & Mobile Screens) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Mode 1: Spaced Daily Review */}
        <div
          onClick={() => navigate('/estudiar/quiz?mode=spaced')}
          className="p-6 rounded-[28px] bg-surface-container flex flex-col justify-between gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] cursor-pointer hover:bg-surface-container-high transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate('/estudiar/quiz?mode=spaced');
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-citation text-xs text-outline uppercase tracking-wider font-semibold">
                Modo espaciado
              </span>
              <span className="font-headline-md text-xl text-on-surface font-semibold">
                {strings.estudiar.modes.spaced}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center">
              <Icon name="history_toggle_off" size={18} className="text-outline" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-container" />
            <span className="font-citation text-xs text-on-surface-variant">
              {strings.estudiar.modeSubtitles.spaced}
            </span>
          </div>
        </div>

        {/* Mode 2: Topic Quiz (In progress) */}
        <div
          onClick={() => navigate('/estudiar/quiz?mode=topic')}
          className="p-6 rounded-[28px] bg-surface-container-high flex flex-col justify-between gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.1),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] cursor-pointer relative overflow-hidden"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate('/estudiar/quiz?mode=topic');
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-citation text-xs text-primary uppercase tracking-wider font-bold">
                  {strings.estudiar.inProgress}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
              </div>
              <span className="font-headline-md text-xl text-on-surface font-semibold">
                {strings.estudiar.modes.topic}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center shadow-md">
              <Icon name="play_arrow" size={18} className="text-on-primary font-bold" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-citation text-xs text-primary">
              Garantías constitucionales
            </span>
            <span className="font-citation text-xs px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-medium">
              3/8 listos
            </span>
          </div>
        </div>

        {/* Mode 3: Formal Simulacrum */}
        <div
          onClick={() => navigate('/estudiar/quiz?mode=simulacrum')}
          className="p-6 rounded-[28px] bg-surface-container flex flex-col justify-between gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] cursor-pointer hover:bg-surface-container-high transition-colors"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate('/estudiar/quiz?mode=simulacrum');
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-citation text-xs text-outline uppercase tracking-wider font-semibold">
                {strings.estudiar.formalEval}
              </span>
              <span className="font-headline-md text-xl text-on-surface font-semibold">
                {strings.estudiar.modes.simulacrum}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center">
              <Icon name="timer" size={18} className="text-secondary" />
            </div>
          </div>
          <p className="font-body text-xs text-on-surface-variant m-0">
            {strings.estudiar.modeSubtitles.simulacrum}
          </p>
        </div>
      </div>

      {/* Weak Spots & Study Tip Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Weak Spots Overview */}
        <div className="p-6 rounded-[28px] bg-surface-container flex flex-col gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-lg text-on-surface font-semibold m-0">
              {strings.estudiar.weakSpotsTitle}
            </h2>
            <div className="w-6 h-6 rounded-full bg-tertiary-container/20 flex items-center justify-center">
              <Icon name="priority_high" size={14} className="text-tertiary-container" />
            </div>
          </div>
          <p className="font-body text-xs text-on-surface-variant m-0">
            {strings.estudiar.weakSpotsSubtitle}
          </p>

          <div className="flex flex-col gap-2 pt-1">
            {weakSpots.map((ws) => (
              <div
                key={ws.id}
                className="p-3 rounded-[16px] bg-surface-container-low flex items-center justify-between shadow-[inset_1px_2px_4px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ws.colorDot }}
                  />
                  <span className="font-body text-sm font-medium text-on-surface">
                    {ws.name}
                  </span>
                </div>
                <span className="font-citation text-xs px-2.5 py-0.5 rounded-full bg-surface-container-highest text-tertiary-container font-semibold">
                  {ws.countLabel}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/estudiar/quiz')}
              className="clay-btn-primary h-11 w-full rounded-[20px] text-on-primary-fixed font-body text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon name="bolt" size={18} />
              <span>Entrenar conceptos débiles ahora</span>
            </button>
          </div>
        </div>

        {/* Study Strategy Context */}
        <div className="p-6 rounded-[28px] bg-white/[0.07] backdrop-blur-[22px] backdrop-saturate-[140%] flex flex-col justify-between gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Icon name="psychology" size={20} className="text-primary-container" />
              <span className="font-citation text-xs text-primary-container uppercase tracking-wider font-semibold">
                {strings.estudiar.studyTipTitle}
              </span>
            </div>
            <p className="font-body text-sm text-on-surface leading-relaxed pt-1 m-0">
              {strings.estudiar.studyTipBody}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-on-surface-variant font-citation text-xs pt-4 border-t border-white/[0.06]">
            <Icon name="school" size={16} />
            <span>{strings.estudiar.basedOnClass}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
