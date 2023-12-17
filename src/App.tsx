import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';

import './App.css';
import './styles/globals.scss';

import BaseLayout from './layout/Layout';
import Homepage from './pages/Homepage/Homepage';
import { theme } from './styles/theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BaseLayout>
          <Homepage />
        </BaseLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
