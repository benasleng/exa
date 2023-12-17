import React from 'react';
import MuiTextField from '@mui/material/TextField';
import styles from './TextField.module.scss';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange }) => {
  return (
    <div className={styles.container}>
      <MuiTextField
        fullWidth
        size="small"
        value={value}
        label={label}
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
};

export default TextField;
