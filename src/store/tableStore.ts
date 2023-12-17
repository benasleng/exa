import { create } from 'zustand';
import { Row } from '../hooks/useContactsTableRows';

export interface ColumnOption {
  label: string;
  value: boolean;
}

export type SortOrder = 'asc' | 'desc';

export type SortColumn = keyof Pick<Row, 'name' | 'city'>;

export interface SortBy {
  column: SortColumn;
  order: SortOrder;
}

type State = {
  selectedRowId: string | null;
  shownColumns: ColumnOption[];
  sortBy: SortBy;
};

type Actions = {
  setSelectedRowId: (id: string | null) => void;
  setShownColumns: (column: ColumnOption) => void;
  setSortBy: (column: SortColumn) => void;
  resetStore: () => void;
};

type TableStore = State & Actions;

const defaultShownColumns = [
  { label: 'Name', value: true },
  { label: 'City', value: true },
  { label: 'Email', value: true },
  { label: 'Phone', value: true },
];

const initialState: State = {
  selectedRowId: null,
  shownColumns: defaultShownColumns,
  sortBy: {
    column: 'name',
    order: 'asc',
  },
};

export const useTableStore = create<TableStore>((set) => ({
  ...initialState,
  setSelectedRowId: (id) => {
    set({ selectedRowId: id });
  },
  setSortBy: (column) => {
    set((state) => {
      const sortExists = state.sortBy.column === column;

      return {
        ...state,
        sortBy: {
          column,
          order: sortExists
            ? state.sortBy.order === 'asc'
              ? 'desc'
              : 'asc'
            : 'asc',
        },
      };
    });
  },
  setShownColumns: (column) => {
    set((state) => {
      const newColumns = state.shownColumns.map((oldColumn) => {
        if (oldColumn.label === column.label) {
          return { ...oldColumn, value: column.value };
        }

        return oldColumn;
      });

      return { ...state, shownColumns: newColumns };
    });
  },
  resetStore: () => {
    set(initialState);
  },
}));
