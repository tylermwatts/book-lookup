import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { IBook } from '../../../../interfaces/IBook';
import { AddToLibrary } from '../Buttons/AddToLibrary';
import { AddToWishlist } from '../Buttons/AddToWishlist';
import './TitleDisplay.css';

export interface TitleDisplayProps {
  book: IBook;
  addBookToLibrary?: Function;
  addBookToWishlist?: Function;
  removeBookFromLibrary?: Function;
  removeBookFromWishlist?: Function;
  library?: Array<IBook>;
  wishlist?: Array<IBook>;
  setDisplayed?: Function;
}

export const TitleDisplay: React.SFC<TitleDisplayProps> = ({
  book,
  library,
  wishlist,
  addBookToLibrary,
  addBookToWishlist,
  removeBookFromLibrary,
  removeBookFromWishlist,
  setDisplayed
}) => {
  return (
    <Spring
      to={{ opacity: 1 }}
      from={{ opacity: 0 }}
      config={{ duration: 500 }}
    >
      {props => (
        <div style={props} className="display-container">
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
              <>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <img src={book.thumbnail} alt="book cover" />
                </a>
                <p>Click image to see title on Google Books</p>
                {addBookToLibrary && !library!.includes(book) && (
                  <AddToLibrary book={book} addToLibrary={addBookToLibrary} />
                )}
                {addBookToWishlist &&
                  !wishlist!.includes(book) &&
                  !library!.includes(book) && (
                    <AddToWishlist
                      book={book}
                      addToWishlist={addBookToWishlist}
                    />
                  )}
                {removeBookFromLibrary && (
                  <button
                    onClick={() => {
                      removeBookFromLibrary(book);
                      setDisplayed!(library ? library[0] : null);
                    }}
                  >
                    Remove from library
                  </button>
                )}
                {removeBookFromWishlist && (
                  <button
                    onClick={() => {
                      removeBookFromWishlist(book);
                      setDisplayed!(library ? library[0] : null);
                    }}
                  >
                    Remove from wishlist
                  </button>
                )}
              </>
            </div>
            <div className="bottom-info-element">
              <h3>Description</h3>
              <p className="description">{book.description}</p>
            </div>
          </div>
        </div>
      )}
    </Spring>
  );
};
