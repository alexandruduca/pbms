import { StoredBooks, StoredBooksKeys } from '../types/types';

const BOOKS_STORAGE_KEY = 'books';

export const getStoredBooks = () => {
  const storedBooks = localStorage.getItem(BOOKS_STORAGE_KEY);
  if (!storedBooks) {
    return { read: [], wantToRead: [], toBuy: [] };
  }
  return JSON.parse(storedBooks);
};

export const getIsInList = (books: StoredBooks, listKey: StoredBooksKeys, bookId: string | undefined) => {
  if (!bookId) {
    return false;
  }
  return books[listKey].find((id) => id === bookId);
};

export const addToList = (books: StoredBooks, listKey: StoredBooksKeys, bookId: string | undefined) => {
  if (!bookId) {
    return;
  }
  books[listKey].push(bookId);
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books));
};

export const deleteFromList = (books: StoredBooks, listKey: StoredBooksKeys, bookId: string | undefined) => {
  if (!bookId) {
    return;
  }
  const newBooks = { ...books, [listKey]: books[listKey].filter((id) => id !== bookId) };
  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(newBooks));
};
