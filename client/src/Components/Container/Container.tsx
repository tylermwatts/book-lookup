import * as React from 'react';
import { Book } from '../../types/Book';
import ResultTable from '../ResultTable/ResultTable';
import SearchField from '../SearchField/SearchField';
import TitleDisplay from '../TitleDisplay/TitleDisplay';
import './Container.css';

export interface ContainerProps {}

const Container: React.SFC<ContainerProps> = () => {
  const initDisplayed: Book = {
    author: 'Author',
    title: 'Title',
    subtitle: 'Subtitle',
    description: 'Book description',
    thumbnail: '#',
    link: '#',
    ISBN: '0123456789123'
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
      <h2>Search for books by title, author, or ISBN number</h2>
      <SearchField searchBooks={searchBooks} />
      {loading ? (
        <h3 style={{ textAlign: 'center' }}>Loading...</h3>
      ) : (
        <>
          {displayed ? (
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
