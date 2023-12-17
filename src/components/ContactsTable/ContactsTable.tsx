import React, { useMemo } from 'react';
import TableRow from './TableRow/TableRow';

import useContactsTableRows from '../../hooks/useContactsTableRows';

import styles from './Table.module.scss';
import Card from '../Card/Card';
import TableHead from './TableHead/TableHead';
import { useTableStore } from '../../store/tableStore';
import Empty from '../Empty/Empty';
import Loader from '../Loader/Loader';
import { useDataStore } from '../../store/dataStore';
import { useFiltersStore } from '../../store/filtersStore';

export interface ContactsTableProps {
  loading?: boolean;
}

const defaultHeaders = [
  { label: 'Name', sortable: true },
  { label: 'City', sortable: true },
  { label: 'Active', sortable: false },
  { label: 'Email', sortable: false },
  { label: 'Phone', sortable: false },
];

const ContactsTable: React.FC<ContactsTableProps> = ({ loading }) => {
  const sortBy = useTableStore((store) => store.sortBy);
  const shownColumns = useTableStore((state) => state.shownColumns);
  const filters = useFiltersStore((store) => store.filters);
  const contacts = useDataStore((store) => store.contacts);
  const { rows } = useContactsTableRows(contacts, filters, sortBy);

  const noColumnsShown = useMemo(() => {
    return shownColumns.every((column) => !column.value);
  }, [shownColumns]);

  const setSelectedRowId = useTableStore((state) => state.setSelectedRowId);

  return (
    <Card>
      {!loading && !rows?.length && <Empty />}

      {!loading && !!rows?.length && (
        <table className={styles.table}>
          <TableHead
            headers={defaultHeaders}
            shownColumns={shownColumns}
            sortBy={sortBy}
            noColumnsShown={noColumnsShown}
          />

          <tbody>
            {noColumnsShown && (
              <tr>
                <td colSpan={defaultHeaders.length + 1}>
                  <Empty message="No columns shown" />
                </td>
              </tr>
            )}

            {!noColumnsShown &&
              rows.map((row, index) => (
                <TableRow
                  key={index}
                  data={row}
                  onClick={setSelectedRowId}
                  shownColumns={shownColumns}
                />
              ))}
          </tbody>
        </table>
      )}

      {loading && !rows?.length && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </Card>
  );
};

export default React.memo(ContactsTable);
