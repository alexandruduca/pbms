import { Autocomplete, ListItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { BookApiResponse, BookType } from '../types/types';
import { BookOption } from './BookOption';
import { useNavigate } from 'react-router';

export const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState<string | null>('');
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm && searchTerm.length > 2) {
        getBooks(searchTerm);
      } else {
        setBooks([]);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const getBooks = (searchTerm: string) => {
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        const books = data.docs.map((book: BookApiResponse) => ({
          id: book.key,
          title: book.title,
          authors: book.author_name,
          coverImageId: book.cover_i,
        }));
        setBooks(books);
        setLoading(false);
      });
  };

  return (
    <Autocomplete
      onInputChange={(_, newValue) => setSearchTerm(newValue)}
      renderInput={(params) => <TextField {...params} label='Please enter a title, author or ISBN' />}
      options={books}
      renderOption={(props, option) => (
        <ListItem
          sx={{
            marginBottom: '10px',
            marginLeft: '10px',
            padding: '0  !important',
            height: '102px',
            border: '1px solid grey',
            width: 'auto',
          }}
          {...props}
          key={option.id}
          onClick={(e) => {
            navigate(`/book/${option.id.replace('/works/', '')}`);
            if (props.onClick) {
              props.onClick(e);
            }
          }}
        >
          <BookOption {...option} />
        </ListItem>
      )}
      getOptionLabel={(option) => option.title}
      filterOptions={(options) => options}
      disableCloseOnSelect={false}
      noOptionsText='No books found.'
      loading={loading}
      loadingText='Loading...'
      sx={{
        width: '50%',
      }}
    />
  );
};
