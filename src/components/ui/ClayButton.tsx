import React from 'react';

interface ClayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'surface';
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

export const ClayButton: React.FC<ClayButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  if (variant === 'primary') {
    return (
      <button
        className={`clay-btn-primary h-12 px-6 rounded-[20px] font-body text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-transform ${className}`}
        {...props}
      >
        {icon && (
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button
      className={`clay-chip h-12 px-5 rounded-[20px] bg-surface-container-high text-on-surface-variant hover:text-on-surface font-body text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-all ${className}`}
      {...props}
    >
      {icon && (
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};
