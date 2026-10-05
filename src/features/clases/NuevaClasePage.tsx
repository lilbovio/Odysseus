import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateSubjectMutation, useUploadDocumentMutation } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const NuevaClasePage: React.FC = () => {
  const navigate = useNavigate();
  const createSubjectMutation = useCreateSubjectMutation();
  const uploadDocMutation = useUploadDocumentMutation();

  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [area, setArea] = useState<'Derecho' | 'Salud' | 'Economía' | 'Tecnología' | 'Arte'>('Derecho');
  const [examDate, setExamDate] = useState('2024-12-10');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const areaColorMap: Record<string, string> = {
    Derecho: '#5ce0b8',
    Salud: '#f4be4e',
    Economía: '#6db8f2',
    Tecnología: '#b8e06a',
    Arte: '#f28dae',
  };

  const handleFakeFileSelect = () => {
    setFileName('Programa_Sintetico_2024.pdf');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsProcessing(true);

    const created = await createSubjectMutation.mutateAsync({
      name: name.trim(),
      professor: professor.trim() || 'Catedrático por asignar',
      area,
      nextExamDate: examDate,
      nextExamFormatted: '10 de dic',
      color: areaColorMap[area],
    });

    if (fileName) {
      await uploadDocMutation.mutateAsync({
        subjectId: created.id,
        title: `Programa Oficial - ${created.name}`,
        fileName,
        pageCount: 18,
        summary: 'Programa analítico con unidades temáticas, lecturas obligatorias y fechas de evaluación.',
      });
    }

    setIsProcessing(false);
    navigate(`/materias/${created.id}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/materias')}
          className="clay-chip h-9 px-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-body text-xs cursor-pointer"
        >
          <Icon name="arrow_back" size={16} />
          <span>Regresar</span>
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="font-headline-xl text-2xl sm:text-3xl text-on-surface font-semibold m-0">
          {strings.clases.newClassTitle}
        </h1>
        <p className="font-body text-sm text-on-surface-variant m-0">
          {strings.clases.subtitle}
        </p>
      </div>

      {/* Main Clay Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-surface-container rounded-[28px] p-6 sm:p-8 flex flex-col gap-5 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]"
      >
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-citation text-xs text-on-surface uppercase font-semibold">
            {strings.clases.nameField} *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={strings.clases.namePlaceholder}
            className="w-full h-11 px-4 rounded-[16px] bg-surface font-body text-sm text-on-surface placeholder:text-outline clay-input-inset focus:outline-none"
          />
        </div>

        {/* Professor & Area Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-citation text-xs text-on-surface uppercase font-semibold">
              {strings.clases.professorField}
            </label>
            <input
              type="text"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              placeholder={strings.clases.professorPlaceholder}
              className="w-full h-11 px-4 rounded-[16px] bg-surface font-body text-sm text-on-surface placeholder:text-outline clay-input-inset focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-citation text-xs text-on-surface uppercase font-semibold">
              {strings.clases.areaField}
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as any)}
              className="w-full h-11 px-4 rounded-[16px] bg-surface font-body text-sm text-on-surface clay-input-inset focus:outline-none cursor-pointer"
            >
              <option value="Derecho">Derecho</option>
              <option value="Salud">Salud</option>
              <option value="Economía">Economía</option>
              <option value="Tecnología">Tecnología</option>
              <option value="Arte">Arte</option>
            </select>
          </div>
        </div>

        {/* Next Exam Date */}
        <div className="flex flex-col gap-1.5">
          <label className="font-citation text-xs text-on-surface uppercase font-semibold">
            {strings.clases.examDateField}
          </label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full h-11 px-4 rounded-[16px] bg-surface font-body text-sm text-on-surface clay-input-inset focus:outline-none cursor-pointer"
          />
        </div>

        {/* File Upload Zone */}
        <div className="flex flex-col gap-1.5">
          <label className="font-citation text-xs text-on-surface uppercase font-semibold">
            {strings.clases.uploadSyllabusTitle}
          </label>
          <div
            onClick={handleFakeFileSelect}
            className="p-6 rounded-[20px] bg-surface-container-low border border-dashed border-white/[0.12] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-surface-container-high transition-colors text-center"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary-container shadow-inner">
              <Icon name="upload_file" size={22} />
            </div>
            {fileName ? (
              <div className="flex items-center gap-2 text-primary font-citation text-xs font-semibold">
                <Icon name="check_circle" size={16} />
                <span>{fileName} ({strings.clases.fileUploadedSuccess})</span>
              </div>
            ) : (
              <>
                <span className="font-body text-xs sm:text-sm text-on-surface font-medium">
                  {strings.clases.dragDropText}
                </span>
                <span className="font-citation text-xs text-outline">
                  {strings.clases.formatsAllowed}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.04]">
          <button
            type="button"
            onClick={() => navigate('/materias')}
            className="clay-chip h-11 px-5 rounded-[20px] text-on-surface font-body text-xs font-medium cursor-pointer"
          >
            {strings.clases.cancelBtn}
          </button>
          <button
            type="submit"
            disabled={!name.trim() || isProcessing}
            className="clay-btn-primary h-11 px-6 rounded-[20px] text-on-primary-fixed font-body text-xs font-bold cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {isProcessing && <span className="w-2 h-2 rounded-full bg-on-primary-fixed animate-ping" />}
            <span>{strings.clases.saveBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
