import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { IBook } from '../../../../interfaces/IBook';
import loadingAnimation from '../../img/loadingAnimation.gif';
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
}

export const Container: React.SFC<ContainerProps> = ({
  displayed,
  setDisplayed,
  books,
  loading,
  searchBooks,
  isLoaded
}) => {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 500 }}
      delay={isLoaded ? 0 : 2000}
    >
      {props => (
        <div className="lookup-container" style={props}>
          <div className="lookup-background">
            <h1>Book Lookup</h1>
            <h2>Search for books by title, author, or ISBN</h2>
            <SearchField searchBooks={searchBooks} />
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', margin: '1em' }}>
              <img src={loadingAnimation} alt="loading animation" />
            </div>
          ) : (
            <>
              {displayed.title ? (
                <Spring
                  from={{ opacity: 0 }}
                  to={{ opacity: 1 }}
                  config={{ duration: 500 }}
                >
                  {props => (
                    <div className="result-background" style={props}>
                      <TitleDisplay book={displayed} />
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
