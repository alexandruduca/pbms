import { PaletteMode } from '@mui/material/styles';

const THEME = 'theme';

export const getThemeMode = () => {
  return (localStorage.getItem(THEME) ?? 'light') as PaletteMode;
};

export const setThemeMode = (mode: PaletteMode) => {
  localStorage.setItem(THEME, mode);
};
