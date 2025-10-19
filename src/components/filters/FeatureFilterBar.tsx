import React from 'react';
import type { District } from '../../data/schemas';
import { CORE_FEATURES, FeatureIcon, CoreFeature } from './FeatureIcons';
import './FeatureFilterBar.css';

interface FeatureFilterBarProps {
  selectedFeatures: CoreFeature[];
  onToggleFeature: (feature: CoreFeature) => void;
  districts: District[];
  selectedDistricts: string[];
  onToggleDistrict: (districtId: string) => void;
}

// Mobile-first simplified filter bar focusing on core needs.
export const FeatureFilterBar: React.FC<FeatureFilterBarProps> = ({
  selectedFeatures,
  onToggleFeature,
  districts,
  selectedDistricts,
  onToggleDistrict,
}) => {
  return (
    <div className="feature-filter-bar" role="region" aria-label="Filters">
      <div className="feature-filter-bar__features" aria-label="Core features">
        {CORE_FEATURES.map(f => {
          const active = selectedFeatures.includes(f.id);
          return (
            <button
              key={f.id}
              type="button"
              className={`feature-chip ${active ? 'feature-chip--active' : ''}`}
              aria-pressed={active}
              onClick={() => onToggleFeature(f.id)}
            >
              <FeatureIcon feature={f.id} size={26} aria-hidden />
              <span className="feature-chip__label">{f.label}</span>
            </button>
          );
        })}
      </div>

      <div className="feature-filter-bar__districts" aria-label="Districts">
        <div className="district-scroll">
          {districts.map(d => {
            const active = selectedDistricts.includes(d.id);
            return (
              <button
                key={d.id}
                type="button"
                className={`district-chip ${active ? 'district-chip--active' : ''}`}
                aria-pressed={active}
                onClick={() => onToggleDistrict(d.id)}
              >
                <span className="district-chip__label">{d.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeatureFilterBar;
