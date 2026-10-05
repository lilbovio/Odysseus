import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  useAgentHistory,
  useAskAgentMutation,
} from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';
import { SourceCitationSheet } from './SourceCitationSheet';
import { SourceModal } from '../../components/ui/SourceModal';

export const PreguntarPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';

  const { data: messages = [] } = useAgentHistory();
  const askMutation = useAskAgentMutation();

  const [strictMode, setStrictMode] = useState(true);
  const [inputText, setInputText] = useState(initialQuery);
  const [activeInspectionIndex, setActiveInspectionIndex] = useState<number>(1);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(true);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // If initial query was passed via URL, automatically ask it on mount once
  useEffect(() => {
    if (initialQuery.trim()) {
      askMutation.mutate({
        query: initialQuery.trim(),
        strictMode,
      });
      setInputText('');
    }
  }, []);

  const handleSend = () => {
    if (!inputText.trim() || askMutation.isPending) return;
    const query = inputText.trim();
    setInputText('');
    askMutation.mutate({
      query,
      strictMode,
    });
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, askMutation.isPending]);

  // Find the most recent message with inspection data
  const currentInspection =
    messages[activeInspectionIndex]?.inspectionData ||
    messages.find((m) => m.inspectionData)?.inspectionData;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1360px] mx-auto pb-16">
      {/* Header & Grounding Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm" />
            <h1 className="font-headline-md text-2xl text-on-surface font-semibold tracking-tight m-0">
              {strings.preguntar.title}
            </h1>
          </div>
          <span className="text-on-surface-variant font-citation text-xs px-3 py-1 rounded-full bg-surface-container-high font-medium">
            Derecho Civil III · Sem. 6
          </span>
        </div>

        {/* Toggle Switch Pills */}
        <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]">
          <button
            type="button"
            onClick={() => setStrictMode(true)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-xs font-citation cursor-pointer ${
              strictMode
                ? 'bg-surface-variant text-primary font-semibold shadow-[4px_6px_12px_rgba(0,0,0,0.4),inset_1px_1px_2px_rgba(255,255,255,0.08)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="verified" size={16} className={strictMode ? 'text-primary' : 'text-outline'} />
            <span>{strings.preguntar.toggleStrict}</span>
          </button>

          <button
            type="button"
            onClick={() => setStrictMode(false)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-xs font-citation cursor-pointer ${
              !strictMode
                ? 'bg-surface-variant text-secondary font-semibold shadow-[4px_6px_12px_rgba(0,0,0,0.4),inset_1px_1px_2px_rgba(255,255,255,0.08)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            title={strings.preguntar.broadTooltip}
          >
            <Icon name="public" size={16} className={!strictMode ? 'text-secondary' : 'text-outline'} />
            <span>{strings.preguntar.toggleBroad}</span>
          </button>
        </div>
      </div>

      {/* Grid: Chat Stream (8 cols) & Desktop Citation Inspector (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Messages */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            {messages.map((msg, index) => {
              const isUser = msg.sender === 'user';

              if (isUser) {
                return (
                  <div
                    key={msg.id}
                    className="flex flex-col gap-1 items-end max-w-xl ml-auto w-full"
                  >
                    <div className="clay-btn-primary rounded-[20px] rounded-tr-sm p-4 text-on-primary-fixed font-body text-sm font-semibold shadow-md">
                      {msg.text}
                    </div>
                    <span className="font-citation text-xs text-outline pr-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              }

              // Agent Message
              return (
                <div
                  key={msg.id}
                  className="flex flex-col gap-2 max-w-2xl w-full"
                >
                  <div className="rounded-[28px] p-6 bg-surface-container text-on-surface space-y-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
                    {/* Header: Verified Pill or Source Boundary */}
                    {msg.isVerified && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-primary-container">
                          <Icon name="verified" size={18} className="text-primary-container" />
                          <span className="font-citation text-xs text-primary-container font-semibold uppercase tracking-wider">
                            {strings.preguntar.verifiedCitation(msg.verifiedSession || 'sesión')}
                          </span>
                        </div>
                        <span className="font-citation text-xs text-outline">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}

                    {msg.isSourceBoundary && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-secondary">
                          <Icon name="info" size={18} className="text-secondary" />
                          <span className="font-citation text-xs text-secondary font-semibold uppercase tracking-wider">
                            {strings.preguntar.sourceBoundary}
                          </span>
                        </div>
                        <span className="font-citation text-xs text-outline">
                          {msg.timestamp}
                        </span>
                      </div>
                    )}

                    {/* Synthesized Response Body */}
                    <p className="font-body text-sm lg:text-base text-on-surface leading-relaxed m-0">
                      {msg.text}
                    </p>

                    {/* Source Citation Pill Triggers */}
                    {msg.sourceTags && msg.sourceTags.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-2 items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {msg.sourceTags.map((src, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => {
                                setActiveInspectionIndex(index);
                                setIsDocModalOpen(true);
                              }}
                              className="clay-chip flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-primary font-citation text-xs cursor-pointer hover:text-on-surface transition-colors"
                            >
                              <Icon name="description" size={16} className="text-primary-container" />
                              <span>{src.docName} · p. {src.page}</span>
                            </button>
                          ))}
                        </div>
                        {msg.matchRate && (
                          <span className="font-citation text-xs text-on-surface-variant">
                            {strings.preguntar.matchRate(msg.matchRate)}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Mobile inline Source Inspection card */}
                    {msg.inspectionData && (
                      <div className="lg:hidden mt-2 p-3.5 rounded-2xl bg-surface-container-low shadow-[inset_1px_2px_4px_rgba(0,0,0,0.5)] flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-secondary font-citation text-xs font-semibold">
                            <Icon name="menu_book" size={16} />
                            <span>Fuente: {msg.inspectionData.docName} (pág. {msg.inspectionData.page})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
                            className="text-on-surface-variant text-xs font-citation hover:underline cursor-pointer"
                          >
                            {mobilePreviewOpen ? 'Ocultar' : 'Ver'}
                          </button>
                        </div>
                        {mobilePreviewOpen && (
                          <div className="p-2.5 rounded-xl bg-secondary text-on-secondary font-citation text-xs font-medium">
                            {msg.inspectionData.highlightedQuote}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Source Boundary Interactive Action Buttons */}
                    {msg.isSourceBoundary && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setStrictMode(false);
                            askMutation.mutate({
                              query: '¿Cuáles son los criterios doctrinales y ejemplos de examen para nulidad y rescisión?',
                              strictMode: false,
                            });
                          }}
                          className="clay-btn-primary h-10 px-4 rounded-[20px] text-on-primary-fixed font-body text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Icon name="public" size={16} />
                          <span>{strings.preguntar.searchGeneralKnowledgeBtn}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/clases/nueva')}
                          className="clay-chip h-10 px-4 rounded-[20px] bg-surface-container-high text-on-surface font-body text-xs font-medium flex items-center gap-1.5 cursor-pointer hover:bg-surface-variant transition-colors"
                        >
                          <Icon name="upload_file" size={16} className="text-outline" />
                          <span>{strings.preguntar.uploadOtherMaterialBtn}</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="font-citation text-xs text-outline pl-2">
                    {msg.timestamp} · Odysseus AI
                  </span>
                </div>
              );
            })}

            {askMutation.isPending && (
              <div className="flex items-center gap-2 text-on-surface-variant font-citation text-xs py-2">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span>Odysseus está analizando tus apuntes e índices vectoriales...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Docked Question Input Box */}
          <div className="sticky bottom-2 w-full pt-1 pb-2 bg-surface/90 backdrop-blur-md z-30">
            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-[24px] bg-surface-container-lowest shadow-[inset_2px_3px_6px_rgba(0,0,0,0.6)]">
              <button
                type="button"
                onClick={() => navigate('/clases/nueva')}
                aria-label={strings.preguntar.attachAria}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-surface-variant text-on-surface-variant hover:text-primary transition-colors shadow-sm cursor-pointer"
              >
                <Icon name="attach_file" size={20} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder={strings.preguntar.inputPlaceholder}
                className="w-full bg-transparent text-on-surface placeholder:text-outline font-body text-xs sm:text-sm focus:outline-none min-w-0"
              />

              <button
                type="button"
                aria-label={strings.preguntar.voiceAria}
                onClick={() => setInputText('Explícame los efectos de tracto sucesivo en la rescisión')}
                className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface cursor-pointer"
                title="Dictar o insertar duda de voz"
              >
                <Icon name="mic" size={18} />
              </button>

              <button
                type="button"
                onClick={handleSend}
                disabled={!inputText.trim() || askMutation.isPending}
                aria-label={strings.preguntar.sendAria}
                className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-[4px_6px_14px_rgba(0,0,0,0.4),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-2px_-3px_5px_rgba(0,0,0,0.2)] active:translate-y-0.5 cursor-pointer disabled:opacity-50 transition-all"
              >
                <Icon name="arrow_upward" size={20} className="text-on-primary" />
              </button>
            </div>

            {/* Status Footer */}
            <div className="flex items-center justify-between px-3 pt-1.5">
              <span className="font-citation text-xs text-on-surface-variant">
                {strings.app.versionInfo}
              </span>
              <span className="font-citation text-xs text-primary flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {strings.app.secureModeActive}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Desktop Citation Inspector Sheet */}
        <div className="hidden lg:block lg:col-span-4 relative">
          {currentInspection ? (
            <SourceCitationSheet
              inspection={currentInspection}
              onOpenFullDoc={() => setIsDocModalOpen(true)}
            />
          ) : (
            <div className="rounded-[28px] p-6 bg-surface-container flex flex-col gap-2 text-center text-outline font-citation text-xs">
              <span>Selecciona una cita en las respuestas para inspeccionar su fragmento original.</span>
            </div>
          )}
        </div>
      </div>

      {/* Full Document Viewer Modal */}
      {currentInspection && (
        <SourceModal
          isOpen={isDocModalOpen}
          onClose={() => setIsDocModalOpen(false)}
          documentTitle={currentInspection.docName}
          classNameTitle={currentInspection.className}
          page={currentInspection.page}
          articleTag={currentInspection.articleTag}
          annotatedDate={currentInspection.annotatedDate}
          professor={currentInspection.professor}
          quote={currentInspection.highlightedQuote}
          similarity={currentInspection.semanticMatchRate}
        />
      )}
    </div>
  );
};
