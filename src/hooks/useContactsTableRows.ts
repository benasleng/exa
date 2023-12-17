import { useEffect, useMemo, useState } from 'react';
import { SortBy } from '../store/tableStore';
import { Contact } from '../models/contacts';
import { Filters } from './useFilters';

export interface Row {
  id: string;
  name?: string;
  city?: string;
  isActive: boolean;
  email?: string;
  phone?: string;
}

export interface Header {
  label: string;
  sortable: boolean;
}

const useContactsTable = (
  contacts: Contact[],
  filters: Filters,
  sortBy: SortBy
) => {
  const [rows, setRows] = useState<Row[]>([]);

  const sortedRows: Row[] = useMemo(() => {
    const formattedContacts = contacts.map(({ name, surname, ...rest }) => ({
      name: `${name} ${surname.slice(0, 1).toUpperCase()}.`,
      ...rest,
    }));
    const sortedContacts = [...formattedContacts].sort((a, b) => {
      const { column, order } = sortBy;
      const sortName = column as keyof Row;

      if (a[sortName] < b[sortName]) {
        return order === 'asc' ? -1 : 1;
      }

      if (a[sortName] > b[sortName]) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return sortedContacts;
  }, [contacts, sortBy]);

  useEffect(() => {
    if (!!Object.keys(filters).length) {
      const filteredRows = sortedRows.filter((row) => {
        return Object.entries(filters).every(([key, filter]) => {
          const rowValue = row[key as keyof Row];

          if (key === 'showActive') {
            return filter || row.isActive === filter;
          }

          if (typeof rowValue === 'string' && filter) {
            return rowValue?.toLowerCase().includes(filter.toLowerCase());
          }

          return rowValue === filter;
        });
      });

      setRows(filteredRows);

      return;
    }

    setRows(sortedRows);
  }, [filters, sortedRows]);

  return { rows };
};

export default useContactsTable;
