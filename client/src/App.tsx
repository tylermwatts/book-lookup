import * as React from 'react';
import './App.css';
import ResultTable from './Components/ResultTable';
import SearchField from './Components/SearchField';
import TitleDisplay from './Components/TitleDisplay';
import { Book } from './types/Book';

function App() {
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
}

export default App;
