import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icon } from '../ui/Icon';
import { strings } from '../../locales/es-MX';

export const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 left-[240px] right-0 h-16 z-30 items-center justify-end px-10 pointer-events-none">
        <NavLink
          to="/yo"
          className="pointer-events-auto w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 transition-opacity shadow-md"
          aria-label="Ver perfil de usuario"
          title={user?.name || 'Perfil'}
        >
          <Icon name="person" size={18} className="text-on-primary" />
        </NavLink>
      </header>

      {/* Mobile Top Bar */}
      <header className="lg:hidden fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="h-14 px-4 flex items-center justify-between">
          <NavLink to="/hoy" className="flex items-center gap-1.5">
            <span className="font-headline-lg text-xl text-on-surface font-semibold tracking-tight">
              {strings.app.name}
            </span>
            <span className="w-2 h-2 rounded-full bg-primary mt-0.5" />
          </NavLink>
          <NavLink
            to="/yo"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 transition-opacity shadow-sm"
            aria-label="Perfil"
          >
            <Icon name="person" size={18} className="text-on-primary" />
          </NavLink>
        </div>
      </header>
    </>
  );
};
