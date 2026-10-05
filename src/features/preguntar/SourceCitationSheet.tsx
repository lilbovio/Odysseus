import React from 'react';
import { AgentSourceInspection } from '../../services/types';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

interface SourceCitationSheetProps {
  inspection: AgentSourceInspection;
  onOpenFullDoc: () => void;
}

export const SourceCitationSheet: React.FC<SourceCitationSheetProps> = ({
  inspection,
  onOpenFullDoc,
}) => {
  return (
    <div className="sticky top-20 rounded-[28px] p-6 bg-surface-container-high/60 backdrop-blur-[22px] backdrop-saturate-[140%] shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] flex flex-col gap-4 text-on-surface">
      {/* Sheet Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2">
          <Icon name="menu_book" size={18} className="text-secondary" />
          <span className="font-citation text-xs uppercase text-on-surface-variant font-medium tracking-wider">
            {strings.preguntar.sourcePreviewTitle}
          </span>
        </div>
        <span className="font-citation text-xs text-primary-container px-2 py-0.5 rounded-full bg-surface-container font-semibold">
          {strings.preguntar.pageLabel(inspection.page)}
        </span>
      </div>

      {/* Doc Title & Class Context */}
      <div className="flex flex-col gap-0.5">
        <span className="font-headline-md text-lg text-on-surface font-semibold">
          {inspection.docName}
        </span>
        <span className="font-body text-xs text-on-surface-variant">
          {inspection.className}
        </span>
        <span className="font-citation text-[11px] text-outline">
          Anotado por ti el {inspection.annotatedDate} · {inspection.professor}
        </span>
      </div>

      {/* Excerpt with Amber Highlighted Quote */}
      <div className="p-3.5 rounded-xl bg-surface-container-lowest font-citation text-xs text-on-surface-variant leading-relaxed max-h-[300px] overflow-y-auto space-y-2.5">
        <p className="opacity-75 m-0">
          ...en contraposición a los requisitos esenciales de existencia, las condiciones de validez determinan la eficacia subsiguiente del negocio jurídico. El vicio en los elementos estructurales conlleva sanciones graduadas por el legislador.
        </p>

        <div className="p-2.5 rounded-lg bg-secondary text-on-secondary font-medium shadow-sm">
          {inspection.highlightedQuote}
        </div>

        <p className="opacity-75 m-0">
          Por su parte, cuando el acto adolece de error, dolo, violencia o falta de capacidad legal relativa, la acción se reserva en beneficio exclusivo del perjudicado...
        </p>
      </div>

      {/* Action and Metric Footer */}
      <div className="flex flex-col gap-2 pt-1 border-t border-white/[0.04]">
        <button
          type="button"
          onClick={onOpenFullDoc}
          className="w-full h-11 rounded-[20px] bg-surface-container text-on-surface hover:bg-surface-container-highest transition-colors font-body text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Icon name="open_in_new" size={18} className="text-primary-container" />
          <span>{strings.preguntar.openFullDoc}</span>
        </button>
        <span className="text-center font-citation text-xs text-outline">
          {strings.preguntar.semanticMatch(inspection.semanticMatchRate)}
        </span>
      </div>
    </div>
  );
};
