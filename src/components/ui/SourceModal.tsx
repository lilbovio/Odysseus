import React from 'react';
import { Icon } from './Icon';

interface SourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  classNameTitle?: string;
  page?: number;
  articleTag?: string;
  annotatedDate?: string;
  professor?: string;
  quote?: string;
  similarity?: number;
}

export const SourceModal: React.FC<SourceModalProps> = ({
  isOpen,
  onClose,
  documentTitle,
  classNameTitle = 'Clase 4 · Invalidez del Acto Jurídico',
  page = 14,
  articleTag = 'Art. 2226',
  annotatedDate = '18 de Febrero',
  professor = 'Profesor Morales',
  quote = '«La nulidad absoluta produce efectos de pleno derecho y no puede convalidarse por confirmación ni por prescripción (Art. 2226)»',
  similarity = 98.4,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="source-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface-container rounded-[28px] p-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)] flex flex-col gap-5 text-on-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">
                visibility
              </span>
              <span className="font-citation text-xs uppercase tracking-wider text-secondary">
                Visor de fuente documental · Pág. {page}
              </span>
              <span className="font-citation text-xs text-primary bg-surface-container-high px-2 py-0.5 rounded-md">
                {articleTag}
              </span>
            </div>
            <h2 id="source-dialog-title" className="font-headline-md text-xl font-semibold text-on-surface pt-1">
              {documentTitle}
            </h2>
            <p className="font-citation text-xs text-on-surface-variant">
              {classNameTitle} · {professor} ({annotatedDate})
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer"
            aria-label="Cerrar visor"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Excerpt Body */}
        <div className="p-4 rounded-xl bg-surface-container-lowest font-citation text-xs text-on-surface-variant leading-relaxed max-h-[300px] overflow-y-auto space-y-3">
          <p className="opacity-80">
            ...en contraposición a los requisitos esenciales de existencia, las condiciones de validez determinan la eficacia subsiguiente del negocio jurídico. El vicio en los elementos estructurales conlleva sanciones graduadas por el legislador.
          </p>
          <div className="p-3 rounded-lg bg-secondary text-on-secondary shadow-sm font-medium">
            {quote}
          </div>
          <p className="opacity-80">
            Por su parte, cuando el acto adolece de error, dolo, violencia o falta de capacidad legal relativa, la acción se reserva en beneficio exclusivo del perjudicado. En tales hipótesis, la ratificación formal o la inacción prolongada extingue la posibilidad de rescisión procesal...
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-2 text-on-surface-variant font-citation text-xs">
            <Icon name="auto_awesome" size={16} className="text-primary" />
            <span>Coincidencia de vector semántico: {similarity}%</span>
          </div>
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-[16px] bg-primary text-on-primary font-body text-xs font-bold cursor-pointer hover:opacity-95"
          >
            Cerrar visor
          </button>
        </div>
      </div>
    </div>
  );
};
