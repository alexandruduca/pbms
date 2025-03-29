import { PaletteMode } from '@mui/material/styles';
import { JSX } from 'react';

export type BookType = {
  id: string;
  title: string;
  authors?: string[];
  coverImageId?: number;
};

export type BookDetails = {
  title: string;
  author: string;
  coverImageId: number;
  publishDate?: string;
  description: string;
};

export type BookProps = {
  bookId?: string;
  onBookAction?: () => void;
};

export enum StoredBooksKeys {
  READ = 'read',
  WANT_TO_READ = 'wantToRead',
  TO_BUY = 'toBuy',
}

export type StoredBooks = {
  [StoredBooksKeys.READ]: string[];
  [StoredBooksKeys.WANT_TO_READ]: string[];
  [StoredBooksKeys.TO_BUY]: string[];
};

export type LayoutProps = {
  mode: PaletteMode;
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
};

export type BookApiResponse = Record<string, unknown>;

export type SnackbarProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export type SnackbarContextType = {
  displayMessage: (message: string, isError?: boolean) => void;
};
