import React from 'react';
import './IconButton.css';

export interface IconButtonProps {
  icon: string;
  label: string; // Required for accessibility
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * IconButton component for actions with icons
 * 
 * Accessibility:
 * - Always has aria-label for screen readers
 * - Min touch target: 44px (iOS) / 48dp (Android)
 * - Keyboard navigable with Enter/Space
 * - Focus visible outline (WCAG AA)
 * - Disabled state properly communicated
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  size = 'md',
  variant = 'default',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const buttonClasses = [
    'icon-button',
    `icon-button--${size}`,
    `icon-button--${variant}`,
    disabled && 'icon-button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      type={type}
    >
      <span className="icon-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
};
