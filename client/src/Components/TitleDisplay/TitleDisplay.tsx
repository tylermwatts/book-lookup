import * as React from 'react';
import { Spring } from 'react-spring/renderprops';
import { AddToLibrary } from '../Buttons/AddToLibrary';
import { AddToWishlist } from '../Buttons/AddToWishlist';
import './TitleDisplay.css';
import { Book } from '../../../classes/Book';

export interface TitleDisplayProps {
  book: Book;
  addBookToLibrary?: Function;
  addBookToWishlist?: Function;
  removeBookFromLibrary?: Function;
  removeBookFromWishlist?: Function;
  library?: Array<Book>;
  wishlist?: Array<Book>;
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
  React.useEffect(() => { }, [wishlist, library]);
  return (
    <Spring
      to={{ opacity: 1 }}
      from={{ opacity: 0 }}
      config={{ duration: 300 }}
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
                {addBookToLibrary &&
                  !library!
                    .map((b: Book) => b.ISBN.ISBN_13)
                    .includes(book.ISBN.ISBN_13) && (
                    <>
                      <AddToLibrary
                        book={book}
                        addToLibrary={addBookToLibrary}
                      />
                      <br />
                    </>
                  )}
                {library &&
                  library
                    .map((b: Book) => b.ISBN.ISBN_13)
                    .includes(book.ISBN.ISBN_13) && (
                    <div>
                      <i>You own this book</i>
                    </div>
                  )}
                {addBookToWishlist &&
                  wishlist !== (undefined && null) &&
                  library !== (undefined && null) &&
                  !wishlist
                    .map((b: Book) => b.ISBN.ISBN_13)
                    .includes(book.ISBN.ISBN_13) &&
                  !library
                    .map((b: Book) => b.ISBN.ISBN_13)
                    .includes(book.ISBN.ISBN_13) && (
                    <AddToWishlist
                      book={book}
                      addToWishlist={addBookToWishlist}
                    />
                  )}
                {wishlist &&
                  wishlist
                    .map((b: Book) => b.ISBN.ISBN_13)
                    .includes(book.ISBN.ISBN_13) && (
                    <div>
                      <i>This book is on your wishlist.</i>
                    </div>
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
