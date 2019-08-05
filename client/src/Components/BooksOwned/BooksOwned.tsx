import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { IBook } from '../../../../interfaces/IBook';
import { BookTable } from '../BookTable';
import { TitleDisplay } from '../TitleDisplay';
import './BooksOwned.css';

export interface BooksOwnedProps {
  ownedBooks: Array<IBook>;
  removeFromLibrary: Function;
}

export const BooksOwned: React.SFC<BooksOwnedProps> = ({
  ownedBooks,
  removeFromLibrary
}) => {
  const [displayed, setDisplayed] = React.useState(ownedBooks[0] || null);
  return (
    <Spring
      to={{ opacity: 1 }}
      from={{ opacity: 0 }}
      config={{ duration: 500 }}
    >
      {props => (
        <div style={props} className="background">
          <div className="background-container">
            <h1 style={{ textDecoration: 'underline' }}>Books I own</h1>
            {displayed ? (
              <TitleDisplay
                book={displayed}
                setDisplayed={setDisplayed}
                removeBookFromLibrary={removeFromLibrary}
              />
            ) : (
              <div>
                No books in your library. Search for books to add them to your
                library.
              </div>
            )}
            <BookTable books={ownedBooks} setDisplayed={setDisplayed} />
          </div>
        </div>
      )}
    </Spring>
  );
};