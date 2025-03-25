import { Box, Button } from '@mui/material';
import { getThemeMode, setThemeMode } from '../utils/themeStorage';
import { LayoutProps } from '../types/types';
import { Searchbar } from './Searchbar';
import { Outlet, useNavigate } from 'react-router';

export const Layout = ({ mode, setMode }: LayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '7px',
        }}
      >
        <Button
          onClick={() => navigate('/')}
          sx={{
            fontSize: '20px',
          }}
        >
          {'📖'}
        </Button>
        <Searchbar />
        <Button
          sx={{
            fontSize: '20px',
          }}
          onClick={() => {
            setThemeMode(mode === 'dark' ? 'light' : 'dark');
            setMode(getThemeMode());
          }}
        >
          {mode === 'dark' ? '☀️' : '🌙'}
        </Button>
      </Box>
      <Outlet />
    </>
  );
};
