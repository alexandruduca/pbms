import { createContext, useContext, useState } from 'react';
import { SnackbarContextType, SnackbarProviderProps } from '../types/types';
import { Alert, Snackbar } from '@mui/material';

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<boolean>(false);

  const displayMessage = (message: string, isError?: boolean) => {
    setMessage(message);
    setError(isError ? true : false);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ displayMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert severity={error ? 'error' : 'success'} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
