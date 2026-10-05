import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../../services/types';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { Icon } from '../../components/ui/Icon';
import { strings } from '../../locales/es-MX';

interface MateriaCardProps {
  subject: Subject;
}

export const MateriaCard: React.FC<MateriaCardProps> = ({ subject }) => {
  const navigate = useNavigate();

  const handleOpenSyllabus = () => {
    navigate(`/materias/${subject.id}`);
  };

  const handleStartQuiz = () => {
    navigate(`/estudiar/quiz?subject=${subject.id}`);
  };

  return (
    <article
      className="group flex flex-col justify-between p-6 rounded-[28px] bg-surface-container transition-all duration-200 hover:-translate-y-1 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]"
      data-area={subject.area}
      data-name={subject.name.toLowerCase()}
    >
      <div className="flex flex-col gap-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-surface-container-high flex items-center gap-2 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.05),inset_-1px_-1px_2px_rgba(0,0,0,0.4)]">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: subject.color }}
            />
            <span className="font-citation text-xs text-on-surface-variant">
              {strings.materias.materialsCount(subject.materialsCount)}
            </span>
          </span>
          <span
            className="font-citation text-xs font-semibold"
            style={{ color: subject.color }}
          >
            {subject.status}
          </span>
        </div>

        {/* Title, Professor & Circular Gauge */}
        <div className="flex items-start justify-between gap-2 pt-1">
          <div className="flex flex-col min-w-0">
            <h2 className="font-headline-md text-xl text-on-surface font-semibold truncate m-0">
              {subject.name}
            </h2>
            <p className="font-body text-xs text-on-surface-variant truncate m-0 mt-0.5">
              {subject.professor}
            </p>
          </div>
          <CircularProgress
            percentage={subject.retentionRate}
            color={subject.color}
            size={56}
          />
        </div>

        {/* Next Exam Pill Container */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-high shadow-[inset_2px_2px_4px_rgba(0,0,0,0.45)]">
          <Icon name="event" size={18} className="text-on-surface-variant" />
          <div className="flex flex-col">
            <span className="font-citation text-[10px] uppercase text-outline leading-tight">
              {strings.materias.nextExam}
            </span>
            <span className="font-body text-xs text-on-surface font-medium leading-tight">
              {subject.nextExamFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 mt-3 border-t border-white/[0.04]">
        <button
          type="button"
          onClick={handleOpenSyllabus}
          className="flex-1 py-2 px-2 rounded-[16px] bg-surface-container-high text-on-surface font-body text-xs hover:text-primary transition-colors shadow-[4px_6px_12px_rgba(0,0,0,0.3),inset_1px_1px_2px_rgba(255,255,255,0.06),inset_-2px_-2px_4px_rgba(0,0,0,0.3)] text-center cursor-pointer font-medium"
        >
          {strings.materias.openSyllabus}
        </button>
        <button
          type="button"
          onClick={handleStartQuiz}
          className="flex-1 py-2 px-2 rounded-[16px] bg-surface-container-high text-on-surface font-body text-xs hover:text-primary transition-colors shadow-[4px_6px_12px_rgba(0,0,0,0.3),inset_1px_1px_2px_rgba(255,255,255,0.06),inset_-2px_-2px_4px_rgba(0,0,0,0.3)] text-center cursor-pointer font-medium"
        >
          {strings.materias.takeQuiz}
        </button>
      </div>
    </article>
  );
};
