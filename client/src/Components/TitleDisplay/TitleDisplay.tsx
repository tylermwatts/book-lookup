import * as React from 'react';
import { Book } from '../../types/Book';
import './TitleDisplay.css';

export interface TitleDisplayProps {
  book: Book;
}

const TitleDisplay: React.SFC<TitleDisplayProps> = ({ book }) => {
  return (
    <div className="display-container">
      <div className="top-row-info">
        <div className="top-info-element">
          <h3>Title</h3>
          <p>
            <em>{book.title}</em>
          </p>
        </div>
        {book.subtitle && (
          <div className="top-info-element">
            <h3>Subtitle</h3>
            <p>{book.subtitle}</p>
          </div>
        )}
        <div className="top-info-element">
          <h3>Author</h3>
          <p>{book.author}</p>
        </div>
        {book.publisher && (
          <div className="top-info-element">
            <h3>Published by</h3>
            <p>{book.publisher}</p>
          </div>
        )}

        <div className="top-info-element">
          <h3>ISBN</h3>
          {book.ISBN.ISBN_10 && <p>ISBN 10: {book.ISBN.ISBN_10}</p>}
          {book.ISBN.ISBN_13 && <p>ISBN 13: {book.ISBN.ISBN_13}</p>}
        </div>
      </div>
      <div className="bottom-row-info">
        <div className="bottom-info-element">
          <h3>Book Cover</h3>
          {book.thumbnail ? (
            <>
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                <img src={book.thumbnail} alt="book cover" />
              </a>
              <p>Click image to see title on Google Books</p>
            </>
          ) : null}
        </div>
        <div className="bottom-info-element">
          <h3>Description</h3>
          <p className="description">{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TitleDisplay;
