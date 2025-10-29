import React, { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../lib/api';
import type { RestaurantListItem, AsyncState, District, FilterState } from '../data/schemas';
import { RestaurantCard } from '../components/restaurant';
import { Skeleton } from '../components/primitives';
import { FilterPanel } from '../components/filters/FilterPanel';
import { SPECIAL_FEATURES, type CoreFeature } from '../components/filters/FeatureIcons';
import './App.css';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Partial<FilterState>>({
    districts: [], // will keep array internally but enforce single element
    features: [],
    special: [],
    sort: 'rating',
  });
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<CoreFeature[]>([]);
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  const [additionalFiltersState, setAdditionalFiltersState] = useState<AsyncState<{ id: string; label: string; emoji?: string }[]>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const [restaurantsState, setRestaurantsState] = useState<AsyncState<RestaurantListItem[]>>({
    status: 'idle',
    data: null,
    error: null,
  });

  const [districtsState, setDistrictsState] = useState<AsyncState<District[]>>({
    status: 'idle',
    data: null,
    error: null,
  });

  // Fetch taxonomies (districts + feature/additional keys) on mount
  useEffect(() => {
    const fetchData = async () => {
      const districts = await apiClient.getDistricts();
      setDistrictsState(districts);
      // Preload feature and additional filters (ignored UI for now, can be wired later)
      apiClient.getFeatureFilters();
      const additionals = await apiClient.getAdditionalFilters();
      setAdditionalFiltersState(additionals);
    };

    fetchData();
  }, []);

  // Fetch restaurants when filters change
  useEffect(() => {
    const fetchRestaurants = async () => {
      setRestaurantsState({ status: 'loading', data: null, error: null });
      const result = await apiClient.getRestaurants(filters);
      setRestaurantsState(result);
    };

    fetchRestaurants();
  }, [filters]);

  const handleSelectDistrict = (districtId: string | null) => {
    setSelectedDistrictId(districtId);
    setFilters(prev => ({
      ...prev,
      districts: districtId ? [districtId] : [],
    }));
  };

  const handleClearFilters = () => {
    setFilters({ districts: [], features: [], special: [], sort: 'rating' });
    setSelectedDistrictId(null);
    setSelectedFeatures([]);
    setSelectedAdditional([]);
  };

  const activeFilterCount = (selectedDistrictId ? 1 : 0) + selectedFeatures.length + selectedAdditional.length;
  const handleToggleAdditional = (id: string) => {
    setSelectedAdditional(prev => {
      const next = prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id];
      setFilters(current => ({ ...current, special: next }));
      return next;
    });
  };

  const handleToggleFeature = (feature: CoreFeature) => {
    setSelectedFeatures(prev => {
      const next = prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature];
      setFilters(current => ({ ...current, features: next }));
      return next;
    });
  };

  const additionalFiltersToShow = useMemo(() => {
    const base = SPECIAL_FEATURES.map(({ id, label }) => ({ id, label }));
    if (!additionalFiltersState.data) {
      return base;
    }
    const info = new Map(additionalFiltersState.data.map(item => [item.id, item]));
    return SPECIAL_FEATURES.map(({ id, label }) => {
      const match = info.get(id);
      return {
        id,
        label: match?.label ?? label,
        emoji: match?.emoji,
      };
    });
  }, [additionalFiltersState.data]);

  const selectedDistrictName = selectedDistrictId && districtsState.data
    ? districtsState.data.find(district => district.id === selectedDistrictId)?.name ?? null
    : null;

  const filteredRestaurants: RestaurantListItem[] | null = useMemo(() => {
    if (restaurantsState.status !== 'success' || !restaurantsState.data) {
      return null;
    }

    return restaurantsState.data
      .filter(r => {
        const districtOk = !selectedDistrictId || r.location.district.toLowerCase() === selectedDistrictId.toLowerCase();
        const featureOk = selectedFeatures.length === 0 || selectedFeatures.some(f => r.tags.includes(f));
        const additionalOk = selectedAdditional.length === 0 || selectedAdditional.some(a => r.tags.includes(a));
        return districtOk && featureOk && additionalOk;
      });
  }, [restaurantsState, selectedDistrictId, selectedFeatures, selectedAdditional]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Ana içeriğe atla
      </a>
      <header className="app-header">
        <h1 className="app-header__title">Yumistanbul</h1>
        {activeFilterCount > 0 && (
          <button type="button" className="link-button" onClick={handleClearFilters}>
            Filtreleri temizle
          </button>
        )}
      </header>

      <main id="main-content" className="app-main">
        {districtsState.status !== 'error' && districtsState.data && (
          <FilterPanel
            selectedFeatures={selectedFeatures}
            onToggleFeature={handleToggleFeature}
            districts={districtsState.data}
            selectedDistrictId={selectedDistrictId}
            onSelectDistrict={handleSelectDistrict}
            additionalFilters={additionalFiltersToShow}
            selectedAdditional={selectedAdditional}
            onToggleAdditional={handleToggleAdditional}
          />
        )}

        {restaurantsState.status === 'loading' && (
          <div className="results-list" aria-live="polite">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="loading-card">
                <Skeleton variant="text" width="40%" height={20} />
                <div className="loading-card__content">
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="text" width="45%" height={16} />
                </div>
              </div>
            ))}
          </div>
        )}

        {restaurantsState.status === 'error' && (
          <div className="error-state" role="alert">
            <p className="error-state__title">🍴 Backend API henüz hazır değil</p>
            <p className="error-state__body">
              Restoran verileri yayınlandığında sonuçlar burada görünecek.
            </p>
            <span className="error-state__code">api.yumistanbul.com/v1</span>
          </div>
        )}

        {restaurantsState.status === 'success' && filteredRestaurants && (
          <>
            <div className="results-meta">
              <span>{filteredRestaurants.length} mekan</span>
              {selectedDistrictName && <span>{selectedDistrictName}</span>}
            </div>

            {filteredRestaurants.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state__title">Sonuç bulunamadı</p>
                <p className="empty-state__body">Farklı filtre kombinasyonları dene veya filtreleri sıfırla.</p>
              </div>
            ) : (
              <div className="results-list">
                {filteredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
