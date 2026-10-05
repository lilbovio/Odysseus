import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  filled?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 20,
  filled = false,
}) => {
  return (
    <span
      className={`material-symbols-outlined select-none inline-flex items-center justify-center ${className}`}
      style={{
        fontSize: `${size}px`,
        width: `${size}px`,
        height: `${size}px`,
        fontVariationSettings: filled ? "'FILL' 1, 'wght' 500" : "'FILL' 0, 'wght' 400",
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
