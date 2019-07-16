import * as React from 'react';
import { Book } from '../types/Book';

export interface TitleDisplayProps {
  book: Book;
}

const TitleDisplay: React.SFC<TitleDisplayProps> = ({ book }) => {
  return (
    <div>
      <h3>Title</h3>
      <p>{book.title}</p>
      {book.subtitle && (
        <>
          <h3>Subtitle</h3>
          <p>{book.subtitle}</p>
        </>
      )}
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
    </div>
  );
};

export default TitleDisplay;
