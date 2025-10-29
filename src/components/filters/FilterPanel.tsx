import React from 'react';
import type { District } from '../../data/schemas';
import {
  CORE_FEATURES,
  FeatureIcon,
  type CoreFeature,
  SPECIAL_FEATURES,
  SpecialIcon,
} from './FeatureIcons';
import './FilterPanel.css';

export interface FilterPanelProps {
  selectedFeatures: CoreFeature[];
  onToggleFeature: (f: CoreFeature) => void;
  districts: District[];
  selectedDistrictId: string | null;
  onSelectDistrict: (id: string | null) => void;
  additionalFilters: { id: string; label: string; emoji?: string }[];
  selectedAdditional: string[];
  onToggleAdditional: (id: string) => void;
}

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
  const specials = SPECIAL_FEATURES.filter((feature) =>
    additionalFilters.some((item) => item.id === feature.id),
  );

  return (
    <div className="filter-panel" aria-label="Filtreler">
      <section aria-labelledby="filters-core">
        <h2 id="filters-core" className="section-heading">
          Öne Çıkan Filtreler
        </h2>
        <div className="feature-icons">
          {CORE_FEATURES.map((feature) => {
            const active = selectedFeatures.includes(feature.id);
            return (
              <button
                key={feature.id}
                type="button"
                className={`feature-pill ${active ? 'feature-pill--active' : ''}`}
                onClick={() => onToggleFeature(feature.id)}
                aria-pressed={active}
              >
                <FeatureIcon feature={feature.id} size={32} aria-hidden />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="filters-districts">
        <h2 id="filters-districts" className="section-heading">
          Semtler
        </h2>
        <div className="chip-row" role="radiogroup" aria-label="Semt seçimi">
          {districts.map((district) => {
            const checked = selectedDistrictId === district.id;
            return (
              <button
                key={district.id}
                type="button"
                role="radio"
                aria-checked={checked}
                className={`chip ${checked ? 'chip--active' : ''}`}
                onClick={() => onSelectDistrict(checked ? null : district.id)}
              >
                {district.name}
              </button>
            );
          })}
        </div>
      </section>

      {specials.length > 0 && (
        <section aria-labelledby="filters-special">
          <h2 id="filters-special" className="section-heading">
            Özel Alanlar
          </h2>
          <div className="feature-icons feature-icons--compact">
            {specials.map((feature) => {
              const active = selectedAdditional.includes(feature.id);
              return (
                <button
                  key={feature.id}
                  type="button"
                  className={`feature-pill ${active ? 'feature-pill--active' : ''}`}
                  onClick={() => onToggleAdditional(feature.id)}
                  aria-pressed={active}
                >
                  <SpecialIcon feature={feature.id} size={28} aria-hidden />
                  <span>{feature.label}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default FilterPanel;
