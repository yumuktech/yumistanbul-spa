import React from 'react';
import { Chip } from '../primitives';
import type { District } from '../../data/schemas';
import './DistrictSelector.css';

export interface DistrictSelectorProps {
  districts: District[];
  selectedDistricts: string[];
  onDistrictToggle: (districtId: string) => void;
  className?: string;
}

/**
 * DistrictSelector component for district filtering
 * 
 * Horizontal scrollable chips with multi-select
 * 
 * Accessibility:
 * - Multi-select with aria-pressed
 * - Keyboard navigation with arrow keys
 * - Screen reader friendly
 */
export const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  districts,
  selectedDistricts,
  onDistrictToggle,
  className = '',
}) => {
  return (
    <div className={`district-selector ${className}`}>
      <div className="district-selector__scroll">
        {districts.map((district) => (
          <Chip
            key={district.id}
            label={district.name}
            selected={selectedDistricts.includes(district.id)}
            onClick={() => onDistrictToggle(district.id)}
            size="md"
          />
        ))}
      </div>
    </div>
  );
};
