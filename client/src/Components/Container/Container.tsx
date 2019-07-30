import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { IBook } from '../../../../interfaces/IBook';
import loadingAnimation from '../../img/loadingAnimation.gif';
import ResultTable from '../ResultTable/ResultTable';
import SearchField from '../SearchField/SearchField';
import TitleDisplay from '../TitleDisplay/TitleDisplay';
import './Container.css';

export interface ContainerProps {
  displayed: IBook;
  setDisplayed: Function;
  books: Array<IBook>;
  loading: boolean;
  searchBooks: Function;
}

const Container: React.SFC<ContainerProps> = ({
  displayed,
  setDisplayed,
  books,
  loading,
  searchBooks
}) => {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
      config={{ duration: 500 }}
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

export default Container;
