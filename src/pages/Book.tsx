import { Box, Button, CircularProgress, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { BookDetails, BookProps, StoredBooksKeys } from '../types/types';
import { addToList, deleteFromList, getIsInList, getStoredBooks } from '../utils/bookStorage';
import { getRatingByBookId, setRating } from '../utils/ratingStorage';

export const Book = ({ bookId, onBookAction }: BookProps) => {
  const params = useParams();
  const id = bookId ?? params.id;
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [storedBooks, setStoredBooks] = useState(getStoredBooks());
  const [ratingValue, setRatingValue] = useState<number | null>(getRatingByBookId(id));
  const isInRead = getIsInList(storedBooks, StoredBooksKeys.READ, id);
  const isInWantToRead = getIsInList(storedBooks, StoredBooksKeys.WANT_TO_READ, id);
  const isInToBuy = getIsInList(storedBooks, StoredBooksKeys.TO_BUY, id);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getBookInfo();
  }, [id]);

  const getBookInfo = () => {
    setLoading(true);
    fetch(`https://openlibrary.org/works/${id}.json`)
      .then((response) => response.json())
      .then(async (data) => {
        const book = {
          title: data.title,
          author: await getAuthor(data.authors[0].author.key),
          coverImageId: data.covers[0],
          publishDate: data.first_publish_date,
          description: typeof data.description === 'string' ? data.description : data.description.value,
        };
        setBookDetails(book);
        setLoading(false);
      });
  };

  const getAuthor = (authorPath: string) => {
    return fetch(`https://openlibrary.org${authorPath}.json`)
      .then((response) => response.json())
      .then((data) => data.name);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '50px auto',
        width: '40%',
        minWidth: '560px',
        padding: '20px',
        boxShadow: '1px 1px 9px 1px rgba(0,0,0,0.74)',
        gap: '10px',
        '@media(max-width: 580px)': {
          minWidth: '360px',
        },
      }}
    >
      {loading ? (
        <>
          <CircularProgress />
          <Typography variant='h6'>Loading book information</Typography>
        </>
      ) : (
        bookDetails && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant='h4'
              sx={{
                marginBottom: '10px',
              }}
            >
              {bookDetails.title}
            </Typography>
            <Typography variant='h5'>
              {bookDetails.author}
              {bookDetails.publishDate ? ` - ${bookDetails.publishDate}` : ''}
            </Typography>
            <img
              src={`https://covers.openlibrary.org/b/id/${bookDetails.coverImageId}.jpg`}
              alt='Cover image'
              style={{
                width: '360px',
                height: '500px',
                margin: '15px 0',
              }}
            />
            <Typography
              variant='body1'
              sx={{
                minWidth: '360px',
              }}
            >
              {bookDetails.description}
            </Typography>
          </Box>
        )
      )}
      <Box>
        {ratingValue ? (
          <Typography variant='h6'>{`Your rating: ${ratingValue}`}</Typography>
        ) : (
          <Typography variant='h6'>Rate this book!</Typography>
        )}
        <Rating
          precision={0.5}
          value={ratingValue}
          onChange={(_, newValue) => {
            setRatingValue(newValue);
            setRating(id, newValue);
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
        }}
      >
        {isInRead ? (
          <Button
            variant='outlined'
            onClick={() => {
              deleteFromList(storedBooks, StoredBooksKeys.READ, id);
              setStoredBooks(getStoredBooks());
              if (onBookAction) {
                onBookAction();
              }
            }}
          >
            - Read
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={() => {
              addToList(storedBooks, StoredBooksKeys.READ, id);
              setStoredBooks(getStoredBooks());
              if (onBookAction) {
                onBookAction();
              }
            }}
          >
            + Read
          </Button>
        )}
        {isInWantToRead ? (
          <Button
            variant='outlined'
            onClick={() => {
              deleteFromList(storedBooks, StoredBooksKeys.WANT_TO_READ, id);
              setStoredBooks(getStoredBooks());
              if (onBookAction) {
                onBookAction();
              }
            }}
          >
            - Want to Read
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={() => {
              addToList(storedBooks, StoredBooksKeys.WANT_TO_READ, id);
              setStoredBooks(getStoredBooks());
              if (onBookAction) {
                onBookAction();
              }
            }}
          >
            + Want to Read
          </Button>
        )}
        {isInToBuy ? (
          <Button
            variant='outlined'
            onClick={() => {
              deleteFromList(storedBooks, StoredBooksKeys.TO_BUY, id);
              setStoredBooks(getStoredBooks());
              if (onBookAction) {
                onBookAction();
              }
            }}
          >
            - To Buy
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={() => {
              addToList(storedBooks, StoredBooksKeys.TO_BUY, id);
              setStoredBooks(getStoredBooks());
              if (onBookAction) {
                onBookAction();
              }
            }}
          >
            + To Buy
          </Button>
        )}
      </Box>
    </Box>
  );
};
