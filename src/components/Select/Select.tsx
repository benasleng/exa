import React from 'react';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import styles from './Select.module.scss';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: any;
  label: string;
  options: Option[];
  onChange: (event: SelectChangeEvent<Option>) => void;
  onClear: () => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  label,
  value,
  onClear,
}) => {
  return (
    <FormControl classes={{ root: styles.container }}>
      <InputLabel id="city-select-label" shrink>
        {label}
      </InputLabel>

      <MuiSelect
        labelId="city-select-label"
        id="city-select"
        size="small"
        value={value}
        label={label}
        onChange={onChange}
        variant="outlined"
        input={<OutlinedInput notched label={label} />}
        endAdornment={
          <IconButton
            sx={{ display: value ? '' : 'none', marginRight: '0.5rem' }}
            onClick={onClear}
          >
            <CloseIcon sx={{ color: 'var(--grey-100)' }} />
          </IconButton>
        }
      >
        {options.map(({ value, label }, index) => (
          <MenuItem key={`${value}-${index}`} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
