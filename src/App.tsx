import { BrowserRouter, Route, Routes } from 'react-router';
import { Home } from './pages/Home';
import { Book } from './pages/Book';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, useState } from 'react';
import { getThemeMode } from './utils/themeStorage';
import { Layout } from './components/Layout';

function App() {
  const [mode, setMode] = useState<PaletteMode>(getThemeMode());

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout mode={mode} setMode={setMode} />}>
            <Route path='/' element={<Home />} />
            <Route path='/book/:id' element={<Book />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
