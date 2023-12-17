import React from 'react';
import styles from './Header.module.scss';
import Filters from './Partials/Filters';

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.topHeader}>
        <span className={styles.logo}>Contactify</span>
      </div>

      <div className={styles.subHeader}>
        <Filters />
      </div>
    </div>
  );
};

export default Header;
