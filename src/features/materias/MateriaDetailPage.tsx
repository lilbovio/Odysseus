import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubject, useDocuments } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { Icon } from '../../components/ui/Icon';
import { SourceModal } from '../../components/ui/SourceModal';

export const MateriaDetailPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: subject, isLoading } = useSubject(id);
  const { data: documents = [] } = useDocuments(subject?.id);

  const [activeTab, setActiveTab] = useState<'syllabus' | 'documents' | 'quizzes'>('syllabus');
  const [selectedDoc, setSelectedDoc] = useState<{
    isOpen: boolean;
    title: string;
    page: number;
    quote?: string;
  }>({
    isOpen: false,
    title: '',
    page: 1,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-on-surface-variant font-citation text-xs">
        Cargando temario...
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <p className="font-headline-md text-lg text-on-surface">Materia no encontrada</p>
        <button
          type="button"
          onClick={() => navigate('/materias')}
          className="clay-btn-primary h-10 px-5 rounded-[20px] font-body text-xs font-semibold cursor-pointer"
        >
          {strings.materiaDetail.backToSubjects}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1380px] mx-auto pb-16">
      {/* Top Breadcrumb & Back Action */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => navigate('/materias')}
          className="clay-chip h-9 px-3 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center gap-1 font-body text-xs cursor-pointer"
        >
          <Icon name="arrow_back" size={16} />
          <span>{strings.materiaDetail.backToSubjects}</span>
        </button>
        <span className="text-outline-variant font-citation text-xs">/</span>
        <span className="font-citation text-xs text-on-surface-variant">{subject.area}</span>
        <span className="text-outline-variant font-citation text-xs">/</span>
        <span className="font-citation text-xs text-primary font-medium">{subject.name}</span>
      </div>

      {/* Main Subject Banner Card */}
      <section className="bg-surface-container rounded-[28px] p-6 lg:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: subject.color }}
            />
            <span className="font-citation text-xs text-on-surface-variant">
              {subject.materialsCount} materiales indexados
            </span>
            <span
              className="font-citation text-xs px-2 py-0.5 rounded-full font-semibold"
              style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
            >
              {subject.status}
            </span>
          </div>

          <h1 className="font-headline-xl text-2xl sm:text-3xl lg:text-4xl text-on-surface font-semibold m-0">
            {subject.name}
          </h1>
          <p className="font-body text-sm text-on-surface-variant m-0">
            {strings.materiaDetail.professorLabel}: {subject.professor}
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs font-citation">
            <div className="flex items-center gap-1.5 text-on-surface">
              <Icon name="event" size={16} className="text-primary-container" />
              <span>
                {strings.materiaDetail.nextEvalLabel}: <strong>{subject.nextExamFormatted}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <CircularProgress
              percentage={subject.retentionRate}
              color={subject.color}
              size={80}
              strokeWidth={5}
            />
            <span className="font-citation text-xs text-outline">
              {strings.materiaDetail.masteryLabel}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => navigate(`/estudiar/quiz?subject=${subject.id}`)}
              className="clay-btn-primary h-11 px-5 rounded-[20px] font-body text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Icon name="play_arrow" size={18} className="text-on-primary-fixed" />
              <span>{strings.materiaDetail.startDiagnosticQuiz}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/clases/nueva')}
              className="clay-chip h-10 px-4 rounded-[20px] bg-surface-container-high text-on-surface font-body text-xs font-medium flex items-center justify-center gap-2 cursor-pointer hover:bg-surface-variant"
            >
              <Icon name="upload_file" size={16} className="text-outline" />
              <span>{strings.materiaDetail.uploadMaterialBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('syllabus')}
          className={`px-4 py-2 rounded-full font-citation text-xs transition-colors cursor-pointer ${
            activeTab === 'syllabus'
              ? 'bg-surface-container-high text-on-surface font-bold shadow-inner'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {strings.materiaDetail.tabs.syllabus}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-full font-citation text-xs transition-colors cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-surface-container-high text-on-surface font-bold shadow-inner'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          {strings.materiaDetail.tabs.documents} ({documents.length})
        </button>
      </div>

      {/* Tab 1: Syllabus Units */}
      {activeTab === 'syllabus' && (
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-xl text-on-surface font-semibold m-0">
            {strings.materiaDetail.unitsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(subject.units || []).map((unit) => (
              <div
                key={unit.id}
                className="p-5 rounded-[24px] bg-surface-container flex flex-col justify-between gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-citation text-xs text-primary font-semibold">
                      {unit.mastery}% dominio
                    </span>
                    <span className="font-citation text-xs text-outline">
                      {unit.docsCount} docs
                    </span>
                  </div>
                  <h3 className="font-headline-md text-base text-on-surface font-semibold m-0">
                    {unit.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <button
                    type="button"
                    onClick={() => navigate(`/estudiar/quiz?subject=${subject.id}&unit=${unit.id}`)}
                    className="text-primary hover:underline font-body text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Practicar esta unidad</span>
                    <Icon name="arrow_forward" size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Indexed Documents */}
      {activeTab === 'documents' && (
        <div className="flex flex-col gap-4">
          <h2 className="font-headline-md text-xl text-on-surface font-semibold m-0">
            {strings.materiaDetail.documentsTitle}
          </h2>
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 rounded-[20px] bg-surface-container flex items-center justify-between gap-4 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.5)]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <Icon name="description" size={20} />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-body text-sm font-semibold text-on-surface truncate">
                      {doc.title}
                    </span>
                    <span className="font-citation text-xs text-on-surface-variant">
                      {doc.fileName} · {doc.pageCount} páginas · Subido: {doc.uploadedAt}
                    </span>
                    <p className="font-body text-xs text-outline line-clamp-1 mt-0.5 m-0">
                      {doc.summary}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDoc({
                      isOpen: true,
                      title: doc.title,
                      page: doc.citationPage || 14,
                      quote: doc.snippetQuote,
                    })
                  }
                  className="clay-chip shrink-0 h-9 px-3.5 rounded-[16px] bg-surface-container-high text-primary font-citation text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Icon name="visibility" size={16} />
                  <span>Ver extracto</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Source Citation Modal */}
      <SourceModal
        isOpen={selectedDoc.isOpen}
        onClose={() => setSelectedDoc((s) => ({ ...s, isOpen: false }))}
        documentTitle={selectedDoc.title}
        page={selectedDoc.page}
        quote={selectedDoc.quote}
      />
    </div>
  );
};
