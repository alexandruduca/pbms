import { Box, Typography } from '@mui/material';
import { BookType } from '../types/types';

export const BookOption = ({ title, authors, coverImageId }: BookType) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {coverImageId && (
        <img
          src={`https://covers.openlibrary.org/b/id/${coverImageId}.jpg`}
          alt='Cover image'
          width='80'
          height='100'
        />
      )}
      <Box>
        <Typography
          variant='h6'
          sx={{
            '@media(max-width: 580px)': {
              fontSize: 14,
            },
          }}
        >
          {title}
        </Typography>
        {authors && (
          <Typography
            variant='subtitle1'
            sx={{
              '@media(max-width: 580px)': {
                fontSize: 12,
              },
            }}
          >
            {authors.join(', ')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
