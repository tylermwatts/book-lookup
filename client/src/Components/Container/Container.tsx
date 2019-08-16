import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { IBook } from '../../../../interfaces/IBook';
import loadingAnimation from '../../img/loadingAnimation.svg';
import { ResultTable } from '../ResultTable';
import { SearchField } from '../SearchField';
import { TitleDisplay } from '../TitleDisplay';
import { Book } from './../../../../classes/Book';
import './Container.css';

export interface ContainerProps {
  displayed: IBook;
  setDisplayed: Function;
  books: Array<Book>;
  loading: boolean;
  searchBooks: Function;
  isLoaded: boolean;
  addBookToLibrary: Function;
  addBookToWishlist: Function;
  library: Array<IBook>;
  wishlist: Array<IBook>;
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
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  display: 'inline-block',
                  margin: '0 auto',
                  padding: '1em',
                  background: '#fcfcfc'
                }}
              >
                <div style={{ margin: '1em' }}>
                  <i>Loading...</i>
                </div>
                <img src={loadingAnimation} alt="loading animation" />
              </div>
            </div>
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
                      <TitleDisplay
                        book={displayed}
                        addBookToLibrary={addBookToLibrary}
                        addBookToWishlist={addBookToWishlist}
                        library={library}
                        wishlist={wishlist}
                      />
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
