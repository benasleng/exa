import React from 'react';
import classNames from 'classnames';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NorthIcon from '@mui/icons-material/North';

import { Header } from '../../../hooks/useContactsTableRows';
import CheckboxDropdown from '../../CheckboxDropdown/CheckboxDropdown';

import {
  ColumnOption,
  SortBy,
  SortColumn,
  useTableStore,
} from '../../../store/tableStore';

import styles from './../Table.module.scss';

interface TableHeadProps {
  headers: Header[];
  shownColumns: ColumnOption[];
  sortBy: SortBy;
  noColumnsShown: boolean;
}

const TableHead: React.FC<TableHeadProps> = ({
  headers,
  shownColumns,
  sortBy,
  noColumnsShown,
}) => {
  const setShownColumns = useTableStore((state) => state.setShownColumns);
  const setSortBy = useTableStore((state) => state.setSortBy);

  return (
    <thead className={styles.head}>
      <tr className={styles.row}>
        {headers.map(({ label, sortable }, index) => {
          const isLast = index === headers.length - 1;
          const isIconCell = label === 'Active';
          const isShown = shownColumns.find(
            (column) => column.label === label && column.value
          );
          const columnSorted = sortBy.column === label.toLowerCase();

          if (noColumnsShown) return <th />;

          if (!isShown && !isIconCell) return null;

          return (
            <th
              className={classNames(
                styles.cell,
                isLast && styles.cellLast,
                isIconCell && styles.cellCenter,
                sortable && styles.cellSortable
              )}
              key={index}
              onClick={() => {
                sortable && setSortBy(label.toLowerCase() as SortColumn);
              }}
            >
              <div className={styles.cellContent}>
                {isIconCell ? <VisibilityIcon color="inherit" /> : label}

                {sortable && columnSorted && (
                  <NorthIcon
                    fontSize="small"
                    color="inherit"
                    sx={{
                      transform: `rotate(${
                        sortBy.order === 'desc' ? '180' : '0'
                      }deg)`,
                    }}
                  />
                )}
              </div>

              <div className={styles.divider} />
            </th>
          );
        })}

        <th className={classNames(styles.cell, styles.cellAction)}>
          <CheckboxDropdown options={shownColumns} onChange={setShownColumns} />
        </th>
      </tr>
    </thead>
  );
};

export default TableHead;
