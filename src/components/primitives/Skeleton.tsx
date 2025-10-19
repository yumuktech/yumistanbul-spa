import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Skeleton component for loading states
 * 
 * Provides visual placeholder while content loads
 * Uses shimmer animation defined in base.css
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const skeletonClasses = [
    'skeleton',
    `skeleton--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return <div className={skeletonClasses} style={style} />;
};
