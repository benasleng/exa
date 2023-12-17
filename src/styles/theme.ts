import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Open Sans',

          '& .MuiOutlinedInput-root': {
            color: 'var(--grey-100)',
            '& fieldset': {
              borderColor: 'var(--grey-100)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--grey-100)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--grey-100)',
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'Open Sans',
          color: 'var(--grey-100)',

          '&.Mui-focused': {
            color: 'var(--grey-100)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontFamily: 'Open Sans',
          color: 'var(--grey-100)',

          '& .MuiSelect-icon': {
            fill: 'var(--grey-100)',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px',
            borderColor: 'var(--grey-100)',
          },

          '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--grey-100)',
          },

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--grey-100)',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});
