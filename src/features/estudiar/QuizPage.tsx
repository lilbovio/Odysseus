import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useQuizQuestion,
  useSubmitConfidenceMutation,
  useWeakSpots,
} from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';
import { SourceModal } from '../../components/ui/SourceModal';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(3);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('opt-a');
  const [confidenceLevel, setConfidenceLevel] = useState<string | null>('knewIt');
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [weakSpotsExpanded, setWeakSpotsExpanded] = useState(true);

  const { data: question, isLoading } = useQuizQuestion(currentQuestionIndex);
  const { data: weakSpots = [] } = useWeakSpots();
  const submitConfidenceMutation = useSubmitConfidenceMutation();

  const handleConfidenceClick = (level: 'knewIt' | 'doubted' | 'guessed' | 'didntKnow') => {
    setConfidenceLevel(level);
    if (question) {
      submitConfidenceMutation.mutate({
        questionId: question.id,
        level,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex === 3) {
      setCurrentQuestionIndex(4);
      setSelectedOptionId('opt-4a');
      setConfidenceLevel(null);
    } else {
      // Completed, redirect to Study hub with toast
      navigate('/estudiar');
    }
  };

  if (isLoading || !question) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-on-surface-variant font-citation text-xs">
        Cargando reactivo...
      </div>
    );
  }

  const progressPercentage = Math.round(
    (question.questionNumber / question.totalQuestions) * 100
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1380px] mx-auto pb-16">
      {/* Top Mode Switcher Pills (Horizontal on both Desktop and Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onClick={() => navigate('/estudiar')}
          className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-citation text-xs shadow-[4px_6px_12px_rgba(0,0,0,0.35),inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-2px_-2px_4px_rgba(0,0,0,0.25)] cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container" />
          <span>{strings.estudiar.modes.spaced}</span>
          <span className="text-outline font-citation text-[10px]">12</span>
        </button>

        <button
          type="button"
          className="shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-on-primary font-citation text-xs font-bold shadow-[4px_6px_14px_rgba(0,0,0,0.4),inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-2px_-3px_5px_rgba(0,0,0,0.25)] cursor-default"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-on-primary" />
          <span>{strings.estudiar.modes.topic}</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/estudiar')}
          className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-citation text-xs shadow-[4px_6px_12px_rgba(0,0,0,0.35),inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-2px_-2px_4px_rgba(0,0,0,0.25)] cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          <span>{strings.estudiar.modes.simulacrum}</span>
        </button>
      </div>

      {/* Main Grid: Quiz Area (8 cols) & Weak Spots / Tips (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
        {/* Left Quiz Stream (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Progress Header Box */}
          <div className="p-4 rounded-[20px] bg-surface-container-low flex flex-col gap-2 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="menu_book" size={16} className="text-primary" />
                <span className="font-citation text-xs text-on-surface uppercase font-medium">
                  {question.subjectName} · {question.unitName}
                </span>
                <span className="text-outline">·</span>
                <span className="font-citation text-xs text-on-surface-variant">
                  {strings.estudiar.completedPct(progressPercentage)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-secondary font-citation text-xs font-semibold">
                <Icon name="schedule" size={14} />
                <span>{strings.estudiar.timeRemaining}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden p-[1px] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.6)]">
              <div
                className="bg-primary-container h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 lg:p-8 rounded-[28px] bg-surface-container flex flex-col gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-citation text-xs font-semibold">
                {question.caseTypeTag}
              </span>
              <span className="font-citation text-xs text-outline">
                {question.difficultyTag}
              </span>
            </div>

            <h1 className="font-headline-lg text-xl sm:text-2xl text-on-surface leading-snug font-semibold m-0">
              {question.questionText}
            </h1>

            {/* Options List */}
            <div className="flex flex-col gap-2.5 pt-2">
              {question.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.isCorrect;
                const isDiscarded = opt.isDiscarded && !isSelected;

                if (isSelected && isCorrect) {
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className="w-full text-left p-4 rounded-[20px] bg-primary-container/10 flex items-start gap-3 shadow-[inset_0_0_0_2px_#7bfdd3,8px_12px_24px_rgba(0,0,0,0.4),inset_1px_1px_3px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Icon name="check" size={16} className="text-on-primary font-bold" />
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-citation text-xs text-primary font-semibold uppercase">
                            Opción {opt.label}
                          </span>
                          <span className="font-citation text-xs text-primary font-semibold">
                            {strings.estudiar.correctSelection}
                          </span>
                        </div>
                        <p className="font-body text-sm text-on-surface font-medium m-0">
                          {opt.text}
                        </p>
                      </div>
                    </button>
                  );
                }

                if (isDiscarded) {
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOptionId(opt.id)}
                      className="w-full text-left p-4 rounded-[20px] bg-surface-container-high opacity-70 flex items-start gap-3 shadow-[4px_6px_12px_rgba(0,0,0,0.2),inset_1px_1px_2px_rgba(255,255,255,0.04),inset_-2px_-2px_4px_rgba(0,0,0,0.2)] transition-all cursor-pointer"
                    >
                      <div className="w-6 h-6 rounded-full bg-surface-container-lowest text-outline flex items-center justify-center shrink-0 mt-0.5">
                        <Icon name="close" size={16} />
                      </div>
                      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-citation text-xs text-outline line-through uppercase">
                            Opción {opt.label}
                          </span>
                          <span className="font-citation text-xs text-outline">
                            {strings.estudiar.discarded}
                          </span>
                        </div>
                        <p className="font-body text-sm text-on-surface-variant line-through m-0">
                          {opt.text}
                        </p>
                      </div>
                    </button>
                  );
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOptionId(opt.id)}
                    className="w-full text-left p-4 rounded-[20px] bg-surface-container flex items-start gap-3 shadow-[6px_8px_16px_rgba(0,0,0,0.3),inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-2px_-3px_5px_rgba(0,0,0,0.25)] hover:bg-surface-container-high transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-surface-container-lowest text-on-surface-variant flex items-center justify-center shrink-0 mt-0.5 font-citation text-xs">
                      {opt.label}
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="font-citation text-xs text-outline uppercase">
                        Opción {opt.label}
                      </span>
                      <p className="font-body text-sm text-on-surface m-0">{opt.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Immediate Feedback Card */}
            <div className="p-5 lg:p-6 rounded-[24px] bg-surface-container-low flex flex-col gap-3 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.45)] mt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-citation text-xs font-semibold">
                    {strings.estudiar.exactFeedback}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-fit"
                >
                  <Icon name="description" size={14} />
                  <span className="font-citation text-xs">
                    {question.sourceDoc} · p. {question.sourcePage}
                  </span>
                </button>
              </div>

              <p className="font-body text-sm text-on-surface leading-relaxed m-0">
                {question.explanation}
              </p>

              {/* Confidence check buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-3 border-t border-white/[0.04]">
                <span className="font-citation text-xs text-outline uppercase font-semibold">
                  {strings.estudiar.confidencePrompt}
                </span>
                <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleConfidenceClick('knewIt')}
                    className={`px-3 py-1.5 rounded-full font-citation text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      confidenceLevel === 'knewIt'
                        ? 'bg-primary-container text-on-primary shadow-inner font-bold'
                        : 'bg-primary-container/20 text-primary hover:bg-primary-container/30'
                    }`}
                  >
                    <Icon name="verified" size={14} />
                    <span>{strings.estudiar.confidenceOptions.knewIt}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfidenceClick('doubted')}
                    className={`px-3 py-1.5 rounded-full font-citation text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      confidenceLevel === 'doubted'
                        ? 'bg-secondary text-on-secondary shadow-inner font-bold'
                        : 'bg-secondary/15 text-secondary hover:bg-secondary/25'
                    }`}
                  >
                    <Icon name="help_outline" size={14} />
                    <span>{strings.estudiar.confidenceOptions.doubted}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfidenceClick('didntKnow')}
                    className={`px-3 py-1.5 rounded-full font-citation text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 ${
                      confidenceLevel === 'didntKnow' || confidenceLevel === 'guessed'
                        ? 'bg-tertiary-container text-on-tertiary-container shadow-inner font-bold'
                        : 'bg-tertiary-container/20 text-tertiary-container hover:bg-tertiary-container/30'
                    }`}
                  >
                    <Icon name="sentiment_dissatisfied" size={14} />
                    <span>{strings.estudiar.confidenceOptions.guessed}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Next question action */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="clay-btn-primary h-12 px-8 flex items-center justify-center gap-2 rounded-[20px] text-on-primary-fixed font-body text-sm font-semibold cursor-pointer transition-transform shadow-md"
              >
                <span>{strings.estudiar.nextQuestionBtn}</span>
                <Icon name="arrow_forward" size={18} className="text-on-primary-fixed" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Weak Spots & Session Analytics (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Weak Spots Container */}
          <div className="p-6 rounded-[28px] bg-surface-container flex flex-col gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="analytics" size={18} className="text-secondary" />
                <h3 className="font-headline-md text-base text-on-surface font-semibold m-0">
                  {strings.estudiar.weakSpotsTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWeakSpotsExpanded(!weakSpotsExpanded)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-citation text-xs font-semibold cursor-pointer"
              >
                <span>66% precisión</span>
                <Icon
                  name={weakSpotsExpanded ? 'expand_less' : 'expand_more'}
                  size={16}
                />
              </button>
            </div>

            {weakSpotsExpanded && (
              <>
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
                        <span className="font-body text-xs font-medium text-on-surface">
                          {ws.name}
                        </span>
                      </div>
                      <span className="font-citation text-[10px] px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary-container font-semibold">
                        {ws.countLabel}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between font-citation text-xs text-on-surface-variant">
                    <span>{strings.estudiar.sessionAccuracy}</span>
                    <span className="text-primary-container font-semibold">66%</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-2 rounded-full overflow-hidden p-[1px] shadow-inner">
                    <div className="bg-primary-container h-full w-[66%] rounded-full" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/estudiar')}
                    className="w-full h-11 rounded-[20px] bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-variant font-body text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-[4px_6px_12px_rgba(0,0,0,0.35),inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-2px_-2px_4px_rgba(0,0,0,0.25)] cursor-pointer"
                  >
                    <Icon name="stop_circle" size={18} />
                    <span>{strings.estudiar.finishQuizBtn}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Study Tip Glass Box */}
          <div className="p-6 rounded-[28px] bg-white/[0.07] backdrop-blur-[22px] backdrop-saturate-[140%] flex flex-col gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-2">
              <Icon name="psychology" size={18} className="text-primary-container" />
              <span className="font-citation text-xs text-primary-container uppercase font-semibold">
                {strings.estudiar.studyTipTitle}
              </span>
            </div>
            <p className="font-body text-xs text-on-surface leading-relaxed pt-1 m-0">
              {strings.estudiar.studyTipBody}
            </p>
            <div className="flex items-center gap-1.5 pt-2 text-on-surface-variant font-citation text-xs border-t border-white/[0.04]">
              <Icon name="school" size={14} />
              <span>{strings.estudiar.basedOnClass}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Inspector Modal */}
      <SourceModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        documentTitle={question.sourceDoc}
        page={question.sourcePage}
        quote={question.explanation}
      />
    </div>
  );
};
