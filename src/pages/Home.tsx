import { Box, Button, Typography } from '@mui/material';
import { useSearchParams } from 'react-router';
import { StoredBooksKeys } from '../types/types';
import { useEffect, useState } from 'react';
import { getStoredBooks } from '../utils/bookStorage';
import { Book } from './Book';

export const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [storedBooks, setStoredBooks] = useState(getStoredBooks());
  const list = searchParams.get('list');

  const toggleList = (listKey: StoredBooksKeys) => {
    const params = new URLSearchParams();
    params.set('list', listKey);
    setSearchParams(params);
  };

  useEffect(() => {
    if (!list) {
      toggleList(StoredBooksKeys.READ);
    }
  }, [toggleList]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant='h3'
        sx={{
          margin: '20px 0',
        }}
      >
        My List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: '15px',
        }}
      >
        <Button
          variant={list === StoredBooksKeys.READ ? 'contained' : 'outlined'}
          onClick={() => toggleList(StoredBooksKeys.READ)}
        >
          Read
        </Button>
        <Button
          variant={list === StoredBooksKeys.WANT_TO_READ ? 'contained' : 'outlined'}
          onClick={() => toggleList(StoredBooksKeys.WANT_TO_READ)}
        >
          Want to Read
        </Button>
        <Button
          variant={list === StoredBooksKeys.TO_BUY ? 'contained' : 'outlined'}
          onClick={() => toggleList(StoredBooksKeys.TO_BUY)}
        >
          To Buy
        </Button>
      </Box>
      {list && (
        <Box>
          {storedBooks[list].length > 0 ? (
            storedBooks[list].map((id: string) => (
              <Book key={id} bookId={id} onBookAction={() => setStoredBooks(getStoredBooks())} />
            ))
          ) : (
            <Typography variant='h6' sx={{ marginTop: '20px' }}>
              No books in this list.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
