import React, { ReactNode } from 'react';
import MuiCheckbox from '@mui/material/Checkbox';

import { FormControlLabel } from '@mui/material';

interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  label: string | ReactNode;
  dark?: boolean;
}

const styles = {
  checkbox: {
    color: 'var(--grey-100)',

    '&.Mui-checked': {
      color: 'var(--form-button-color)',
    },
  },
  checkboxDark: {
    color: 'var(--dark)',
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'var(--grey-100)',
  },
  typographyDark: {
    color: 'var(--dark)',
  },
};

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  dark,
}) => {
  return (
    <FormControlLabel
      componentsProps={{
        typography: {
          sx: { ...styles.typography, ...(dark && styles.typographyDark) },
        },
      }}
      control={
        <MuiCheckbox
          sx={{ ...styles.checkbox, ...(dark && styles.checkboxDark) }}
          checked={checked}
          onChange={() => onChange(!checked)}
          inputProps={{ 'aria-label': 'controlled' }}
          color="primary"
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
