import React from 'react';
import classNames from 'classnames';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { Row } from '../../../hooks/useContactsTableRows';

import { ColumnOption } from '../../../store/tableStore';

import styles from './../Table.module.scss';

export interface TableRowProps {
  data: Row;
  onClick: (id: string) => void;
  shownColumns: ColumnOption[];
}

const TableRow: React.FC<TableRowProps> = ({ data, onClick, shownColumns }) => {
  return (
    <tr
      className={classNames(styles.row, styles.rowBody)}
      onClick={() => onClick(data.id)}
      role="presentation"
      data-testId="table-row"
    >
      {Object.entries(data).map(([key, value], index) => {
        const isLast = index === Object.entries(data).length - 1;
        const isIconCell = key === 'isActive';
        const isShown = shownColumns.find(
          (column) => column.label.toLowerCase() === key && column.value
        );

        if ((key === 'id' || !isShown) && !isIconCell) return null;

        return (
          <td
            key={index}
            className={classNames(
              styles.cell,
              isLast && styles.cellLast,
              isIconCell && !!value && styles.cellCenter
            )}
          >
            {isIconCell && !!value ? (
              <VisibilityIcon color="disabled" />
            ) : (
              value
            )}

            {!isLast && <div className={styles.divider} />}
          </td>
        );
      })}

      <td />
    </tr>
  );
};

export default TableRow;
