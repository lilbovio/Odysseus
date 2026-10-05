import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { strings } from '../../locales/es-MX';
import { Icon } from '../../components/ui/Icon';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [career, setCareer] = useState('Licenciatura en Derecho');
  const [semester, setSemester] = useState('6to Semestre');
  const [dailyGoal, setDailyGoal] = useState(15);

  const careers = [
    'Licenciatura en Derecho',
    'Médico Cirujano / Salud',
    'Licenciatura en Economía',
    'Ingeniería en Computación',
    'Historia del Arte y Humanidades',
  ];

  const handleFinish = async () => {
    await login('juan.perez@universidad.edu.mx', `${career} · ${semester}`);
    navigate('/hoy');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Solid Flat Shapes behind glass (Strictly Solid, Zero Gradients) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-primary-container opacity-30" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-secondary opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-xl bg-surface-container rounded-[28px] p-6 sm:p-10 flex flex-col gap-6 shadow-[12px_16px_32px_rgba(0,0,0,0.45),-6px_-6px_16px_rgba(255,255,255,0.03),inset_2px_2px_4px_rgba(255,255,255,0.07),inset_-4px_-6px_10px_rgba(0,0,0,0.35)]">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-headline-xl text-3xl text-on-surface font-semibold tracking-tight">
            {strings.app.name}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1" />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg text-2xl text-on-surface font-semibold m-0">
            {strings.onboarding.welcomeTitle}
          </h1>
          <p className="font-body text-sm text-on-surface-variant m-0 leading-relaxed">
            {strings.onboarding.welcomeSubtitle}
          </p>
        </div>

        {/* Form Selection */}
        <div className="flex flex-col gap-5 pt-2">
          {/* Step 1: Career */}
          <div className="flex flex-col gap-2">
            <label className="font-citation text-xs text-on-surface uppercase font-semibold">
              {strings.onboarding.step1Title}
            </label>
            <select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="w-full h-11 px-4 rounded-[16px] bg-surface font-body text-sm text-on-surface clay-input-inset focus:outline-none cursor-pointer"
            >
              {careers.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Semester */}
          <div className="flex flex-col gap-2">
            <label className="font-citation text-xs text-on-surface uppercase font-semibold">
              Ciclo académico actual
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['2do Sem', '4to Sem', '6to Sem', '8vo Sem'].map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSemester(sem)}
                  className={`py-2 rounded-xl font-citation text-xs transition-all cursor-pointer ${
                    semester.startsWith(sem.substring(0, 3))
                      ? 'bg-primary text-on-primary font-bold shadow-md'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface shadow-[4px_6px_12px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Daily Target */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-citation text-xs text-on-surface uppercase font-semibold">
                {strings.onboarding.step3Title}
              </label>
              <span className="font-citation text-xs text-primary font-bold">
                {dailyGoal} tarjetas/día (~15 min)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full accent-[#5ce0b8] cursor-pointer"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <button
            type="button"
            onClick={() => navigate('/hoy')}
            className="text-on-surface-variant hover:text-on-surface font-body text-xs cursor-pointer"
          >
            {strings.onboarding.skipBtn}
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="clay-btn-primary h-12 px-8 rounded-[20px] text-on-primary-fixed font-body text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>{strings.onboarding.continueBtn}</span>
            <Icon name="arrow_forward" size={18} className="text-on-primary-fixed" />
          </button>
        </div>
      </div>
    </div>
  );
};
