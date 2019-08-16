import * as React from 'react';
import { Book } from '../../../../../classes/Book';

export interface AddToLibraryProps {
  book: Book;
  addToLibrary: Function;
}

export const AddToLibrary: React.SFC<AddToLibraryProps> = ({
  book,
  addToLibrary
}) => {
  return <button onClick={() => addToLibrary(book)}>I own this book</button>;
};
