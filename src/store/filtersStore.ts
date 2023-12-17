import { create } from 'zustand';
import { Filters } from '../hooks/useFilters';

type State = {
  filters: Filters;
};

type Actions = {
  setFilters: (data: Filters) => void;
};

type FiltersStore = State & Actions;

const initialState: State = {
  filters: {},
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  ...initialState,
  setFilters: (data) => {
    set({ filters: data });
  },
  resetStore: () => {
    set(initialState);
  },
}));
