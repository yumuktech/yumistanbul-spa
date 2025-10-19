import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Badge component for status indicators and counts
 * 
 * Used for:
 * - Status indicators (Open/Closed)
 * - Notification counts
 * - Feature tags
 * - Categories
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={badgeClasses}>{children}</span>;
};
