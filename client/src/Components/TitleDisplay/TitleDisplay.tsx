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
          <p>{book.title}</p>
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
        <div className="top-info-element">
          <h3>ISBN</h3>
          <p>{book.ISBN}</p>
        </div>
      </div>
      <div className="bottom-row-info">
        <div className="bottom-info-element">
          <h3>Book Cover</h3>
          <a href={book.link} target="_blank" rel="noopener noreferrer">
            <img src={book.thumbnail} alt="book cover" />
          </a>
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
