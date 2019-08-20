import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { Book } from '../../../classes/Book';
import { AddToLibrary } from '../Buttons/AddToLibrary';
import { AddToWishlist } from '../Buttons/AddToWishlist';
import { LoadingAnimation } from '../LoadingAnimation';
import { ResultTable } from '../ResultTable';
import { SearchField } from '../SearchField';
import { TitleDisplay } from '../TitleDisplay';
import './Container.css';

export interface ContainerProps {
  displayed: Book;
  setDisplayed: Function;
  books: Array<Book>;
  loading: boolean;
  searchBooks: Function;
  isLoaded: boolean;
  addBookToLibrary: Function;
  addBookToWishlist: Function;
  library: Array<Book>;
  wishlist: Array<Book>;
}

export const Container: React.SFC<ContainerProps> = ({
  displayed,
  setDisplayed,
  books,
  loading,
  searchBooks,
  isLoaded,
  addBookToLibrary,
  addBookToWishlist,
  library,
  wishlist
}) => {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 300 }}
      delay={isLoaded ? 0 : 1000}
    >
      {props => (
        <div className="lookup-container" style={props}>
          <div className="lookup-background">
            <h1>Book Lookup</h1>
            <h2>Search for books by title, author, or ISBN</h2>
            <SearchField searchBooks={searchBooks} />
          </div>
          {loading ? (
            <LoadingAnimation />
          ) : (
            <>
              {displayed.title ? (
                <Spring
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  config={{ duration: 300 }}
                >
                  {props => (
                    <div className="result-background" style={props}>
                      <TitleDisplay book={displayed}>
                        <>
                          {library
                            .map((b: Book) => b.ISBN.ISBN_13)
                            .includes(displayed.ISBN.ISBN_13) ? (
                            <div>
                              <i>You own this book</i>
                            </div>
                          ) : (
                            <>
                              <AddToLibrary
                                book={displayed}
                                addToLibrary={addBookToLibrary}
                              />
                              <br />
                            </>
                          )}
                          {wishlist
                            .map((b: Book) => b.ISBN.ISBN_13)
                            .includes(displayed.ISBN.ISBN_13) ? (
                            <div>
                              <i>This book is on your wishlist.</i>
                            </div>
                          ) : library
                              .map((b: Book) => b.ISBN.ISBN_13)
                              .includes(displayed.ISBN.ISBN_13) ? null : (
                            <AddToWishlist
                              book={displayed}
                              addToWishlist={addBookToWishlist}
                            />
                          )}
                        </>
                      </TitleDisplay>
                      <ResultTable
                        bookList={books}
                        setDisplayed={setDisplayed}
                      />
                    </div>
                  )}
                </Spring>
              ) : null}
            </>
          )}
        </div>
      )}
    </Spring>
  );
};
