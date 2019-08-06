import * as React from 'react';
import { IBook } from '../../../../../interfaces/IBook';

export interface AddToLibraryProps {
  book: IBook;
  addToLibrary: Function;
}

export const AddToLibrary: React.SFC<AddToLibraryProps> = ({
  book,
  addToLibrary
}) => {
  return <button onClick={() => addToLibrary(book)}>I own this book</button>;
};
