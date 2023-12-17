import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { Filters } from '../hooks/useFilters';

interface UseFiltersStoreProps {
  filters: Filters;
  setFilters: (data: Filters) => void;
}

const useFiltersStore = create<UseFiltersStoreProps>()((set) => ({
  filters: {},
  setFilters: (data) => {
    set({ filters: data });
  },
}));

describe('useFiltersStore', () => {
  test('filters initial value is an empty object', () => {
    const { result } = renderHook(() => useFiltersStore());
    expect(result.current.filters).toEqual({});
  });

  test('every time setFilters is called filters value is updated', () => {
    const { result } = renderHook(() => useFiltersStore());
    expect(result.current.filters).toEqual({});

    act(() => result.current.setFilters({ name: 'John' }));
    expect(result.current.filters).toEqual({ name: 'John' });
  });
});
