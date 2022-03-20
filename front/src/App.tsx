import React from 'react';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuyPage from './pages/BuyPage';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/buy/:id" element={<BuyPage/>} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
