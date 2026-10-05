import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomTabBar } from './BottomTabBar';
import { Header } from './Header';
import { FloatingQueryBar } from './FloatingQueryBar';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  // Don't show floating query bar on /preguntar or /estudiar/quiz since they have their own dedicated docked inputs/controls
  const hideFloatingBar =
    location.pathname.startsWith('/preguntar') ||
    location.pathname.startsWith('/estudiar/quiz') ||
    location.pathname === '/onboarding';

  return (
    <div className="relative min-h-screen bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
      {/* Decorative Solid Flat Shapes behind viewport for glass refraction (Strictly Solid, Zero Gradients) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-primary-container opacity-30" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-secondary opacity-20" />
        <div className="absolute -bottom-24 left-1/4 w-[32rem] h-[32rem] rounded-full bg-tertiary-container opacity-20" />
        <div className="absolute top-1/4 right-0 w-[28rem] h-[28rem] rounded-full bg-primary-container opacity-15" />
      </div>

      {/* Desktop Left Glass Sidebar */}
      <Sidebar />

      {/* Shared Header (Desktop profile button + Mobile top bar) */}
      <Header />

      {/* Main Content Area */}
      <div className="lg:pl-[240px] flex flex-col min-h-screen relative z-10">
        <main className="flex-1 pt-14 lg:pt-16 pb-28 lg:pb-32 px-4 sm:px-6 lg:px-10">
          <Outlet />
        </main>
      </div>

      {/* Floating Query Bar (Appears on Hoy, Materias, etc.) */}
      {!hideFloatingBar && <FloatingQueryBar />}

      {/* Mobile Bottom Glass Tab Bar */}
      <BottomTabBar />
    </div>
  );
};
