import React, { Fragment, useMemo } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Select from '../../Select/Select';
import TextField from '../../TextField/TextField';
import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';
import { useFilters } from '../../../hooks/useFilters';

import styles from './Filters.module.scss';
import { useDataStore } from '../../../store/dataStore';

const Filters: React.FC = () => {
  const contacts = useDataStore((state) => state.contacts);
  const { values, handleChange, handleSubmit, handleClear } = useFilters();

  const cities = useMemo(() => {
    return contacts.map((contact) => ({
      value: contact.city,
      label: contact.city,
    }));
  }, [contacts]);

  return (
    <div className={styles.filters}>
      <TextField
        value={values.name || ''}
        onChange={(value) => handleChange('name', value)}
        label="Name"
      />

      <Select
        value={values.city || ''}
        onChange={(event) => handleChange('city', event.target.value)}
        onClear={() => handleClear('city')}
        label="City"
        options={cities}
      />

      <Checkbox
        checked={values.showActive}
        onChange={(checked) => handleChange('showActive', checked)}
        label={
          <Fragment>
            Show active <VisibilityIcon color="inherit" />
          </Fragment>
        }
      />

      <div className={styles.action}>
        <Button onClick={handleSubmit} label="Filter" />
      </div>
    </div>
  );
};

export default Filters;
