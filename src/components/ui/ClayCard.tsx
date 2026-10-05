import React from 'react';

interface ClayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const ClayCard: React.FC<ClayCardProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`clay-card p-6 relative overflow-hidden text-on-surface ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
