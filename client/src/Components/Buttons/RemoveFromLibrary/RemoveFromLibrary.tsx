import * as React from 'react';
import { Book } from '../../../../classes/Book';

export interface RemoveFromLibraryProps {
  removeFromLibrary: Function;
  setDisplayed: Function;
  displayed: Book;
  ownedBooks: Array<Book>;
}

export const RemoveFromLibrary: React.SFC<RemoveFromLibraryProps> = ({
  removeFromLibrary,
  setDisplayed,
  displayed,
  ownedBooks
}) => {
  return (
    <button
      onClick={() => {
        removeFromLibrary(displayed);
        setDisplayed(ownedBooks[0] || null);
      }}
    >
      Remove from library
    </button>
  );
};
