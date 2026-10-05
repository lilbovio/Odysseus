import React from 'react';
import { NavLink } from 'react-router-dom';
import { strings } from '../../locales/es-MX';
import { Icon } from '../ui/Icon';

export const BottomTabBar: React.FC = () => {
  const tabs = [
    { path: '/hoy', label: strings.nav.hoy, icon: 'wb_sunny' },
    { path: '/materias', label: strings.nav.materias, icon: 'menu_book' },
    { path: '/preguntar', label: strings.nav.preguntar, icon: 'chat_bubble' },
    { path: '/estudiar', label: strings.nav.estudiar, icon: 'psychology' },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 w-full z-50 bg-white/5 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Barra de navegación móvil"
    >
      <div className="h-16 px-4 flex items-center justify-around">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  name={tab.icon}
                  size={22}
                  className={isActive ? 'text-primary' : 'text-on-surface-variant'}
                  filled={isActive}
                />
                <span className="font-citation text-[11px] mt-0.5 leading-tight tracking-wider">
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
