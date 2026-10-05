import React from 'react';

interface ClayChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  dotColor?: string;
  children: React.ReactNode;
  className?: string;
}

export const ClayChip: React.FC<ClayChipProps> = ({
  active = false,
  dotColor,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-full font-citation text-xs transition-all cursor-pointer flex items-center gap-2 ${
        active
          ? 'clay-chip-active bg-surface-container-high text-on-surface'
          : 'clay-chip bg-surface-container-high text-on-surface-variant hover:text-on-surface'
      } ${className}`}
      {...props}
    >
      {dotColor && (
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </button>
  );
};
