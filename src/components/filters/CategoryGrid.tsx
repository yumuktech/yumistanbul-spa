import React from 'react';
import { Chip } from '../primitives';
import type { Category } from '../../data/schemas';
import './CategoryGrid.css';

export interface CategoryGridProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  variant?: 'pictorial' | 'compact';
  className?: string;
}

/**
 * CategoryGrid component for category filtering
 * 
 * Two variants:
 * - Pictorial: Large icon grid (3-4 cols on mobile)
 * - Compact: Horizontal scrollable chips
 * 
 * Accessibility:
 * - Multi-select with aria-pressed
 * - Keyboard navigation
 * - Screen reader friendly labels
 */
export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  variant = 'pictorial',
  className = '',
}) => {
  if (variant === 'compact') {
    return (
      <div className={`category-grid category-grid--compact ${className}`}>
        <div className="category-grid__scroll">
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={`${category.icon} ${category.name}`}
              selected={selectedCategories.includes(category.id)}
              onClick={() => onCategoryToggle(category.id)}
              size="md"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`category-grid category-grid--pictorial ${className}`}>
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category.id);
        
        return (
          <button
            key={category.id}
            className={`category-card ${isSelected ? 'category-card--selected' : ''}`}
            onClick={() => onCategoryToggle(category.id)}
            aria-pressed={isSelected}
            type="button"
          >
            <span className="category-card__icon" aria-hidden="true">
              {category.icon}
            </span>
            <span className="category-card__name">{category.name}</span>
            <span className="category-card__count">{category.count}</span>
          </button>
        );
      })}
    </div>
  );
};
