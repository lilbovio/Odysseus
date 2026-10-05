import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  useUserProfile,
  useClassroomSync,
  useTriggerClassroomSyncMutation,
} from '../../hooks/useOdysseusData';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const YoPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: classroom } = useClassroomSync();
  const syncMutation = useTriggerClassroomSyncMutation();

  const [syncToast, setSyncToast] = useState(false);

  const handleSyncClassroom = () => {
    syncMutation.mutate(undefined, {
      onSuccess: () => {
        setSyncToast(true);
        setTimeout(() => setSyncToast(false), 3000);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col gap-1 pt-1">
        <h1 className="font-headline-xl text-3xl sm:text-4xl text-on-surface font-semibold tracking-tight m-0">
          {strings.yo.title}
        </h1>
        <p className="font-body text-sm text-on-surface-variant m-0">
          Gestión de cuenta académica, sincronizaciones de cursos y algoritmo de espaciado.
        </p>
      </div>

      {/* Student Identity Card */}
      <section className="bg-surface-container rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-md text-2xl font-bold shadow-md shrink-0">
            {user?.name ? user.name[0] : 'J'}
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface font-semibold m-0">
              {profile?.fullName || user?.name || 'Juan Pérez'}
            </h2>
            <span className="font-body text-xs sm:text-sm text-primary font-medium mt-0.5">
              {profile?.career || user?.career || strings.yo.career}
            </span>
            <span className="font-citation text-xs text-outline mt-0.5">
              {profile?.email || user?.email || strings.yo.email} · {profile?.university || strings.yo.university}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="clay-chip h-10 px-4 rounded-[16px] bg-surface-container-high text-on-surface-variant hover:text-error text-xs font-citation flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
        >
          <Icon name="logout" size={16} />
          <span>{strings.yo.logoutBtn}</span>
        </button>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-[20px] bg-surface-container flex flex-col gap-1 shadow-[12px_16px_32px_rgba(0,0,0,0.45),inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-3px_-4px_6px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-1.5 text-secondary">
            <Icon name="bolt" size={18} />
            <span className="font-citation text-[11px] uppercase tracking-wider text-outline">
              {strings.yo.streakCard}
            </span>
          </div>
          <span className="font-headline-md text-xl font-semibold text-on-surface mt-1">
            {strings.yo.streakDays(profile?.studyStreakDays || 12)}
          </span>
        </div>

        <div className="p-4 rounded-[20px] bg-surface-container flex flex-col gap-1 shadow-[12px_16px_32px_rgba(0,0,0,0.45),inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-3px_-4px_6px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-1.5 text-primary-container">
            <Icon name="verified" size={18} />
            <span className="font-citation text-[11px] uppercase tracking-wider text-outline">
              {strings.yo.averageCard}
            </span>
          </div>
          <span className="font-headline-md text-xl font-semibold text-on-surface mt-1">
            {profile?.averageGrade || 8.9}
          </span>
        </div>

        <div className="p-4 rounded-[20px] bg-surface-container flex flex-col gap-1 shadow-[12px_16px_32px_rgba(0,0,0,0.45),inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-3px_-4px_6px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-1.5 text-outline">
            <Icon name="description" size={18} />
            <span className="font-citation text-[11px] uppercase tracking-wider text-outline">
              {strings.yo.docsCard}
            </span>
          </div>
          <span className="font-headline-md text-xl font-semibold text-on-surface mt-1">
            {profile?.processedDocsCount || 42}
          </span>
        </div>

        <div className="p-4 rounded-[20px] bg-surface-container flex flex-col gap-1 shadow-[12px_16px_32px_rgba(0,0,0,0.45),inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-3px_-4px_6px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-1.5 text-primary">
            <Icon name="trending_up" size={18} />
            <span className="font-citation text-[11px] uppercase tracking-wider text-outline">
              {strings.yo.retentionCard}
            </span>
          </div>
          <span className="font-headline-md text-xl font-semibold text-on-surface mt-1">
            {profile?.overallRetentionRate || 82}%
          </span>
        </div>
      </section>

      {/* External Sync (Google Classroom) */}
      <section className="bg-surface-container rounded-[28px] p-6 flex flex-col gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-3px_-4px_6px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="sync" size={20} className="text-primary-container" />
            <h2 className="font-headline-md text-lg text-on-surface font-semibold m-0">
              {strings.yo.syncHeader}
            </h2>
          </div>
          {syncToast && (
            <span className="font-citation text-xs text-primary-container animate-fade-in font-medium">
              Sincronización completada
            </span>
          )}
        </div>

        <div className="p-4 rounded-[20px] bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.5)]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <Icon name="school" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-body text-sm font-semibold text-on-surface">
                {strings.yo.classroomTitle}
              </span>
              <span className="font-citation text-xs text-on-surface-variant">
                {strings.yo.classroomStatus}
              </span>
              <span className="font-citation text-[11px] text-outline mt-0.5">
                Última sincronización: {classroom?.lastSyncFormatted || 'hace 15 minutos'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSyncClassroom}
            disabled={syncMutation.isPending}
            className="clay-chip h-10 px-4 rounded-[16px] bg-surface-container-high text-primary font-citation text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-surface-variant transition-colors shrink-0 disabled:opacity-50"
          >
            <Icon
              name="refresh"
              size={16}
              className={syncMutation.isPending ? 'animate-spin' : ''}
            />
            <span>{strings.yo.syncNowBtn}</span>
          </button>
        </div>
      </section>

      {/* Spaced Repetition Algorithm Settings */}
      <section className="bg-surface-container rounded-[28px] p-6 flex flex-col gap-4 shadow-[12px_16px_32px_rgba(0,0,0,0.45),inset_2px_2px_4px_rgba(255,255,255,0.05),inset_-3px_-4px_6px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2">
          <Icon name="tune" size={20} className="text-secondary" />
          <h2 className="font-headline-md text-lg text-on-surface font-semibold m-0">
            {strings.yo.algorithmHeader}
          </h2>
        </div>

        <div className="flex flex-col gap-3 font-body text-xs sm:text-sm text-on-surface-variant">
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low shadow-[inset_1px_2px_4px_rgba(0,0,0,0.4)]">
            <span className="font-medium text-on-surface">Motor de intervalos</span>
            <span className="font-citation text-xs text-primary font-semibold">
              {profile?.algorithm || strings.yo.algorithmType}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low shadow-[inset_1px_2px_4px_rgba(0,0,0,0.4)]">
            <span className="font-medium text-on-surface">{strings.yo.dailyTargetCards}</span>
            <span className="font-citation text-xs text-secondary font-semibold">
              {profile?.dailyGoalCards || 20} tarjetas/día
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low shadow-[inset_1px_2px_4px_rgba(0,0,0,0.4)]">
            <span className="font-medium text-on-surface">Meta de retención</span>
            <span className="font-citation text-xs text-on-surface font-semibold">
              85% (Equilibrio memoria / carga de estudio)
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
