import * as React from 'react';
import './App.css';
import SearchField from './Components/SearchField';
import { Book } from './types/Book';

function App() {
  const initBook: Book = {
    author: 'Some Author',
    title: 'Title: Subtitle',
    description: 'Description of the book.',
    thumbnail: '#',
    link: '#',
    ISBN: '1234567891234'
  };
  const [book, setBook] = React.useState(initBook);

  const searchBooks = (text: string) => {
    fetch(`/api/title`, {
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
          setBook(data);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div style={{ margin: '3em' }}>
      <SearchField searchBooks={searchBooks} />
      {book ? (
        <>
          <h3>Title</h3>
          <p>{book.title}</p>
          <h3>Author</h3>
          <p>{book.author}</p>
          <h3>ISBN</h3>
          <p>{book.ISBN}</p>
          <h3>Description</h3>
          <p>{book.description}</p>
          <h3>Book Cover</h3>
          <a href={book.link} target="_blank" rel="noopener noreferrer">
            <img src={book.thumbnail} alt="book cover" />
          </a>
        </>
      ) : null}
    </div>
  );
}

export default App;
