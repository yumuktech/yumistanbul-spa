import React from 'react';
import './Chip.css';

export interface ChipProps {
  label: string;
  selected?: boolean;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filter' | 'tag';
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Chip component for filters, tags, and selections
 * 
 * Accessibility:
 * - Min touch target: 44px (iOS) / 48dp (Android)
 * - Keyboard navigable with Enter/Space
 * - ARIA role="button" for interactive chips
 * - aria-pressed for selection state
 * - Focus visible outline (WCAG AA)
 */
export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  icon,
  size = 'md',
  variant = 'filter',
  onClick,
  onRemove,
  disabled = false,
  className = '',
}) => {
  const isInteractive = Boolean(onClick);

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    if (!disabled && onRemove) {
      e.stopPropagation();
      onRemove();
    }
  };

  const chipClasses = [
    'chip',
    `chip--${size}`,
    `chip--${variant}`,
    selected && 'chip--selected',
    disabled && 'chip--disabled',
    isInteractive && 'chip--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const ChipElement = isInteractive ? 'button' : 'span';

  return (
    <ChipElement
      className={chipClasses}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      disabled={disabled}
      role={isInteractive ? 'button' : undefined}
      aria-pressed={isInteractive ? selected : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      type={isInteractive ? 'button' : undefined}
    >
      {icon && <span className="chip__icon" aria-hidden="true">{icon}</span>}
      <span className="chip__label">{label}</span>
      {onRemove && (
        <button
          className="chip__remove"
          onClick={handleRemove}
          aria-label={`Remove ${label}`}
          type="button"
          tabIndex={-1}
        >
          ×
        </button>
      )}
    </ChipElement>
  );
};
