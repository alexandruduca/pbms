const RATINGS = 'ratings';

const getRatings = () => {
  const ratings = localStorage.getItem(RATINGS);
  if (!ratings) {
    return {};
  }
  return JSON.parse(ratings);
};

export const getRatingByBookId = (bookId: string | undefined) => {
  if (!bookId) {
    return;
  }
  const ratings = getRatings();
  return ratings[bookId] ?? null;
};

export const setRating = (bookId: string | undefined, rating: number | null) => {
  if (!bookId) {
    return;
  }
  const ratings = getRatings();
  if (rating === null) {
    delete ratings[bookId];
  } else {
    ratings[bookId] = rating;
  }
  localStorage.setItem(RATINGS, JSON.stringify(ratings));
};
