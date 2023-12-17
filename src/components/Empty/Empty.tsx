import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import styles from './Empty.module.scss';

export interface EmptyProps {
  message?: string;
}

const Empty: React.FC<EmptyProps> = ({ message }) => {
  return (
    <div className={styles.empty}>
      <ErrorOutlineIcon color="info" fontSize="large" />

      <h3>{message || 'No data available'}</h3>
    </div>
  );
};

export default Empty;
