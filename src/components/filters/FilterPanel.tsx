import React from 'react';
import type { District } from '../../data/schemas';
import { CORE_FEATURES, FeatureIcon, CoreFeature } from './FeatureIcons';
import './FilterPanel.css';

export interface FilterPanelProps {
  selectedFeatures: CoreFeature[];
  onToggleFeature: (f: CoreFeature) => void;
  districts: District[];
  selectedDistrictId: string | null; // radio behavior
  onSelectDistrict: (id: string | null) => void;
  additionalFilters: { id: string; label: string; emoji?: string }[]; // dynamic from API
  selectedAdditional: string[];
  onToggleAdditional: (id: string) => void;
}

// Removed static ADDITIONAL_FILTERS; now fully dynamic from backend.

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  margin: '0 0 12px',
  textAlign: 'center',
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedFeatures,
  onToggleFeature,
  districts,
  selectedDistrictId,
  onSelectDistrict,
  additionalFilters,
  selectedAdditional,
  onToggleAdditional,
}) => {
  return (
    <div className="filter-panel" aria-label="Filters">
      {/* Restaurant Features */}
      <div className="filter-panel__section">
        <h2 style={sectionTitleStyle}>Restaurant Features</h2>
        <div className="feature-grid">
          {CORE_FEATURES.map(f => {
            const active = selectedFeatures.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                className={`feature-tile ${active ? 'is-active' : ''}`}
                onClick={() => onToggleFeature(f.id)}
                aria-pressed={active}
              >
                <FeatureIcon feature={f.id} size={36} aria-hidden />
                <span className="feature-tile__label">{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* District */}
      <div className="filter-panel__section">
        <h2 style={sectionTitleStyle}>District</h2>
        <div className="chip-row" role="radiogroup" aria-label="District selection">
          {districts.map(d => {
            const checked = selectedDistrictId === d.id;
            return (
              <button
                key={d.id}
                type="button"
                role="radio"
                aria-checked={checked}
                className={`chip ${checked ? 'is-active' : ''}`}
                onClick={() => onSelectDistrict(checked ? null : d.id)}
              >
                {d.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="filter-panel__section">
        <h2 style={sectionTitleStyle}>Additional Filters</h2>
        <p className="filter-panel__hint">Find places that are perfect for special occasions, working remotely, or going out with friends</p>
        <div className="chip-row" role="group" aria-label="Additional filters">
          {additionalFilters.map(f => {
            const active = selectedAdditional.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                className={`chip ${active ? 'is-active' : ''}`}
                onClick={() => onToggleAdditional(f.id)}
                aria-pressed={active}
              >
                <span aria-hidden>{f.emoji ?? ''}</span> {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
