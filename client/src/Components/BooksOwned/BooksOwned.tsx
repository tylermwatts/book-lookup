import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Book } from '../../../classes/Book';
import { BookTableContainer } from '../BookTableContainer';
import { RemoveFromLibrary } from '../Buttons/RemoveFromLibrary';
import { TitleDisplay } from '../TitleDisplay';
import './BooksOwned.css';

export interface BooksOwnedProps {
  ownedBooks: Array<Book>;
  removeFromLibrary: Function;
}

export const BooksOwned: React.SFC<BooksOwnedProps> = ({
  ownedBooks,
  removeFromLibrary
}) => {
  const [displayed, setDisplayed] = React.useState(ownedBooks[0] || null);
  React.useEffect(() => {
    setDisplayed(ownedBooks[0]);
  }, [ownedBooks]);
  return (
    <Spring
      to={{ opacity: 1 }}
      from={{ opacity: 0 }}
      config={{ duration: 300 }}
    >
      {props => (
        <div style={props} className="background">
          <div className="background-container">
            <h1 style={{ textDecoration: 'underline' }}>Books I own</h1>
            {displayed ? (
              <>
                <TitleDisplay book={displayed}>
                  <RemoveFromLibrary
                    removeFromLibrary={removeFromLibrary}
                    setDisplayed={setDisplayed}
                    displayed={displayed}
                    ownedBooks={ownedBooks}
                  />
                </TitleDisplay>
                <BookTableContainer
                  ownedBooks={ownedBooks}
                  setDisplayed={setDisplayed}
                />
              </>
            ) : (
              <div>
                No books in your library. Search for books to add them to your
                library.
              </div>
            )}
          </div>
        </div>
      )}
    </Spring>
  );
};
