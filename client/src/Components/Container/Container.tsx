import * as React from 'react';
import loadingAnimation from '../../loadingAnimation.gif';
import { Book } from '../../types/Book';
import ResultTable from '../ResultTable/ResultTable';
import SearchField from '../SearchField/SearchField';
import TitleDisplay from '../TitleDisplay/TitleDisplay';
import './Container.css';

export interface ContainerProps {}

const Container: React.SFC<ContainerProps> = () => {
  const initDisplayed: Book = {
    author: '',
    title: '',
    subtitle: '',
    description: '',
    thumbnail: '',
    link: '',
    ISBN: {
      ISBN_10: '',
      ISBN_13: ''
    }
  };

  const [displayed, setDisplayed] = React.useState(initDisplayed);
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const searchBooks = (text: string) => {
    setLoading(true);
    fetch(`/api/search`, {
      method: 'POST',
      body: JSON.stringify({
        text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setDisplayed(data.books[0]);
          setBooks(data.books);
          setLoading(false);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div style={{ margin: '3em' }}>
      <h1>Book Lookup</h1>
      <h2>Search for books by title, author, or ISBN</h2>
      <SearchField searchBooks={searchBooks} />
      {loading ? (
        <div style={{ textAlign: 'center', margin: '1em' }}>
          <img src={loadingAnimation} alt="loading animation" />
        </div>
      ) : (
        <>
          {displayed.title ? (
            <>
              <TitleDisplay book={displayed} />
              <ResultTable bookList={books} setDisplayed={setDisplayed} />
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Container;
