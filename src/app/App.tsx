import React, { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';
import type { RestaurantListItem, AsyncState, District, FilterState } from '../data/schemas';
import { RestaurantCard } from '../components/restaurant';
import { Skeleton } from '../components/primitives';
import { FilterPanel } from '../components/filters/FilterPanel';
import type { CoreFeature } from '../components/filters/FeatureIcons';

const App: React.FC = () => {
  const [filters, setFilters] = useState<Partial<FilterState>>({
    districts: [], // will keep array internally but enforce single element
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
    setFilters(prev => ({ ...prev, districts: districtId ? [districtId] : [] }));
  };

  const handleClearFilters = () => {
  setFilters({ districts: [], sort: 'rating' });
  setSelectedDistrictId(null);
    setSelectedFeatures([]);
    setSelectedAdditional([]);
  };

  const activeFilterCount = (selectedDistrictId ? 1 : 0) + selectedFeatures.length + selectedAdditional.length;
  const handleToggleAdditional = (id: string) => {
    setSelectedAdditional(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const handleToggleFeature = (feature: CoreFeature) => {
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
  };

  // Detail View
  // List View
  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Ana içeriğe atla
      </a>

      <main id="main-content">
        <div className="container" style={{ padding: '16px', maxWidth: '680px', margin: '0 auto' }}>
          <header style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>Yumistanbul</h1>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                style={{ background: 'none', border: 'none', color: 'var(--color-primary-a)', fontWeight: 600, cursor: 'pointer' }}
              >Reset</button>
            )}
          </header>
          {districtsState.status !== 'error' && districtsState.data && additionalFiltersState.data && (
            <FilterPanel
              selectedFeatures={selectedFeatures}
              onToggleFeature={handleToggleFeature}
              districts={districtsState.data}
              selectedDistrictId={selectedDistrictId}
              onSelectDistrict={handleSelectDistrict}
              additionalFilters={additionalFiltersState.data}
              selectedAdditional={selectedAdditional}
              onToggleAdditional={handleToggleAdditional}
            />
          )}

          {/* Results Count */}
          {restaurantsState.status === 'success' && restaurantsState.data && (
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', margin: '12px 0' }}>
              {restaurantsState.data.length} places
            </p>
          )}

          {/* Loading State */}
          {restaurantsState.status === 'loading' && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px' 
            }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ 
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--border-radius-lg)',
                  overflow: 'hidden'
                }}>
                  <Skeleton variant="rectangular" height={200} />
                  <div style={{ padding: '16px' }}>
                    <Skeleton variant="text" width="60%" height={24} />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="100%" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {restaurantsState.status === 'error' && (
            <div style={{ 
              padding: '48px', 
              textAlign: 'center',
              background: '#fee',
              borderRadius: '8px'
            }}>
              <p style={{ color: '#c00', fontSize: '18px', marginBottom: '8px' }}>
                🍴 Backend API Not Available
              </p>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                The restaurant API isn't deployed yet. This is normal during development!
              </p>
              <p style={{ fontSize: '14px', color: '#888' }}>
                Once the backend at <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>api.yumistanbul.com/v1</code> is live, restaurants will appear here.
              </p>
            </div>
          )}

          {/* Restaurant Grid */}
          {restaurantsState.status === 'success' && restaurantsState.data && (
            <>
              {restaurantsState.data.length === 0 ? (
                <div style={{ 
                  padding: '48px', 
                  textAlign: 'center',
                  color: 'var(--color-text-secondary)'
                }}>
                  <p style={{ fontSize: '18px', marginBottom: '8px' }}>
                    No restaurants found
                  </p>
                  <p>Try adjusting your filters</p>
                </div>
              ) : (
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px' 
                }}>
                  {restaurantsState.data
                    .filter(r => {
                      const districtOk = !selectedDistrictId || r.location.district.toLowerCase() === selectedDistrictId.toLowerCase();
                      const featureOk = selectedFeatures.length === 0 || selectedFeatures.some(f => r.tags.includes(f));
                      const additionalOk = selectedAdditional.length === 0 || selectedAdditional.some(a => r.tags.includes(a));
                      return districtOk && featureOk && additionalOk;
                    })
                    .map((restaurant) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
