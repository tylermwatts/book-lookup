import React, { useState } from 'react';
import './App.css';
import SearchField from './Components/SearchField';

function App() {
  const [book, setBook] = useState(null);

  const searchBooks = text => {
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
      .then(data => console.log(data) || setBook(data))
      .catch(err => console.log(err));
  };
  return (
    <div style={{ margin: '3em' }}>
      <SearchField searchBooks={searchBooks} />
      {book &&
        (console.log(book.link) || (
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
        ))}
    </div>
  );
}

export default App;
