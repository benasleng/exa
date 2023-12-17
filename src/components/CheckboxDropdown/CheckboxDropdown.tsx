import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { ColumnOption } from '../../store/tableStore';

import Checkbox from '../Checkbox/Checkbox';

interface DropdownProps {
  options: ColumnOption[];
  onChange: (option: ColumnOption) => void;
}

const styles = {
  button: {
    padding: '1rem',
    margin: '-1rem',
    borderRadius: '0',
  },
  buttonActive: {
    background: 'var(--white)',
    color: 'var(--brand-lightest)',
  },
  menu: {
    minWidth: '145px',
    borderRadius: '0',
    padding: '0',
    boxShadow: 'var(--card-shadow)',
  },
  menuList: {
    padding: '0',
  },
  listItem: {
    padding: '0.225rem 0',
    boxShadow: 'var(--table-row-shadow)',

    label: {
      width: '100%',
    },
  },
};

const CheckboxDropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        disableRipple
        aria-label="table-options"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        sx={{ ...styles.button, ...(isOpen && styles.buttonActive) }}
      >
        <MenuIcon color="inherit" />
      </IconButton>

      <Menu
        MenuListProps={{
          sx: styles.menuList,
        }}
        slotProps={{ paper: { sx: styles.menu } }}
        open={isOpen}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {options.map(({ label, value }) => (
          <MenuItem sx={styles.listItem} key={label}>
            <Checkbox
              checked={value}
              dark
              label={label}
              onChange={(checked) => onChange({ label, value: checked })}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CheckboxDropdown;
