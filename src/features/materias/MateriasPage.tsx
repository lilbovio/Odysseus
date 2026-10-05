import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubjects } from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';
import { MateriaCard } from './MateriaCard';
import { WeeklyDistributionChart } from './WeeklyDistributionChart';
import { StudySuggestionsSection } from './StudySuggestionsSection';

export const MateriasPage: React.FC = () => {
  const { data: subjects = [] } = useSubjects();
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { key: 'all', label: strings.materias.filterAll },
    { key: 'Derecho', label: strings.materias.categories.derecho, dotColor: '#5ce0b8' },
    { key: 'Salud', label: strings.materias.categories.salud, dotColor: '#f4be4e' },
    { key: 'Economía', label: strings.materias.categories.economia, dotColor: '#6db8f2' },
    { key: 'Tecnología', label: strings.materias.categories.tecnologia, dotColor: '#b8e06a' },
  ];

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesCategory =
        activeFilter === 'all' || subject.area.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === '' ||
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.professor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.area.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [subjects, activeFilter, searchQuery]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1380px] mx-auto pb-16">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs font-citation">
            <span className="text-primary-container tracking-wider uppercase font-semibold">
              {strings.materias.academicCycle}
            </span>
            <span className="text-outline-variant">/</span>
            <span className="text-on-surface-variant font-medium">
              {strings.materias.degree}
            </span>
          </div>
          <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface tracking-tight font-semibold m-0">
            {strings.materias.pageTitle}
          </h1>
          <p className="font-body text-sm text-on-surface-variant m-0">
            {strings.materias.subtitle(subjects.length, 42)}
          </p>
        </div>

        {/* Global Metric Strips */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3.5 py-1.5 rounded-full bg-surface-container-high flex items-center gap-2 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.06),inset_-2px_-2px_4px_rgba(0,0,0,0.35)]">
            <Icon name="verified" size={18} className="text-primary-container" />
            <span className="font-citation text-xs text-on-surface font-medium">
              {strings.materias.globalAverage}
            </span>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-surface-container-high flex items-center gap-2 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.06),inset_-2px_-2px_4px_rgba(0,0,0,0.35)]">
            <Icon name="bolt" size={18} className="text-secondary" />
            <span className="font-citation text-xs text-on-surface font-medium">
              {strings.materias.studyStreak}
            </span>
          </div>
        </div>
      </header>

      {/* Filter Row & Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-1">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions.map((opt) => {
            const isActive = activeFilter === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setActiveFilter(opt.key)}
                className={`px-3.5 py-1.5 rounded-full font-citation text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface shadow-[inset_3px_3px_6px_rgba(0,0,0,0.60),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] translate-y-[1px] font-semibold'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface shadow-[4px_6px_12px_rgba(0,0,0,0.35),inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-2px_-2px_4px_rgba(0,0,0,0.25)]'
                }`}
              >
                {opt.dotColor && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: opt.dotColor }}
                  />
                )}
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full lg:w-80">
          <Icon
            name="search"
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={strings.materias.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-[20px] bg-surface font-body text-xs sm:text-sm text-on-surface placeholder:text-outline clay-input-inset focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-1">
        {filteredSubjects.map((subject) => (
          <MateriaCard key={subject.id} subject={subject} />
        ))}

        {/* Card: Agregar Materia */}
        <div
          onClick={() => navigate('/clases/nueva')}
          className="group flex flex-col items-center justify-center p-8 rounded-[28px] bg-surface-container/60 hover:bg-surface-container transition-all duration-200 cursor-pointer min-h-[280px] shadow-[inset_2px_3px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_4px_rgba(255,255,255,0.03)] text-center"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') navigate('/clases/nueva');
          }}
          aria-label={strings.materias.addSubject}
        >
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary-container group-hover:scale-105 transition-transform shadow-[4px_6px_12px_rgba(0,0,0,0.4),inset_1px_1px_2px_rgba(255,255,255,0.08),inset_-2px_-2px_4px_rgba(0,0,0,0.25)] mb-4">
            <Icon name="add" size={28} className="text-primary-container" />
          </div>
          <h2 className="font-headline-md text-lg text-on-surface font-semibold m-0 mb-1">
            {strings.materias.addSubject}
          </h2>
          <p className="font-body text-xs text-on-surface-variant max-w-[200px] m-0">
            {strings.materias.addSubjectDesc}
          </p>
        </div>
      </div>

      {/* Analytics & Retention Suggestions Panel */}
      <section className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyDistributionChart />
        <StudySuggestionsSection />
      </section>
    </div>
  );
};
