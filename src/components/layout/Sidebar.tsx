import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { strings } from '../../locales/es-MX';
import { Icon } from '../ui/Icon';

interface SidebarProps {
  onAddMaterialClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onAddMaterialClick }) => {
  const navigate = useNavigate();

  const navItems = [
    { path: '/hoy', label: strings.nav.hoy, icon: 'event_available' },
    { path: '/materias', label: strings.nav.materias, icon: 'auto_stories' },
    { path: '/preguntar', label: strings.nav.preguntar, icon: 'forum' },
    { path: '/estudiar', label: strings.nav.estudiar, icon: 'psychology' },
    { path: '/yo', label: strings.nav.yo, icon: 'person' },
  ];

  const handleAddClick = () => {
    if (onAddMaterialClick) {
      onAddMaterialClick();
    } else {
      navigate('/clases/nueva');
    }
  };

  return (
    <aside
      className="hidden lg:flex fixed left-0 top-0 h-full w-[240px] z-40 flex-col justify-between p-6 rounded-r-3xl bg-white/[0.07] backdrop-blur-[22px] backdrop-saturate-[140%] border-r border-y border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      aria-label="Navegación principal"
    >
      <div className="flex flex-col gap-8">
        {/* Brand Lockup */}
        <NavLink
          to="/hoy"
          className="flex items-center gap-1.5 px-1 group cursor-pointer"
          aria-label="Ir al inicio de Odysseus"
        >
          <span className="font-headline-lg text-2xl text-on-surface font-semibold tracking-tight">
            {strings.app.name}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-primary mt-1 shadow-sm" />
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-[20px] transition-all font-body text-sm font-medium ${
                  isActive
                    ? 'bg-surface-container-high text-on-surface shadow-[inset_3px_3px_6px_rgba(0,0,0,0.60),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] translate-y-[1px]'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    name={item.icon}
                    size={20}
                    className={isActive ? 'text-primary' : 'text-on-surface-variant'}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Action Button */}
      <div className="flex flex-col gap-4">
        <button
          onClick={handleAddClick}
          className="clay-btn-primary h-12 w-full flex items-center justify-center gap-2 rounded-[20px] text-on-primary-fixed font-body text-sm font-semibold cursor-pointer transition-transform"
          type="button"
        >
          <Icon name="add" size={20} className="text-on-primary-fixed" />
          <span>{strings.nav.agregarMaterial}</span>
        </button>
      </div>
    </aside>
  );
};
