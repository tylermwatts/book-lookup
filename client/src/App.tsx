import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IBook } from './../../interfaces/IBook';
import './App.css';
import { About } from './Components/About';
import { BooksOwned } from './Components/BooksOwned';
import { Container } from './Components/Container';
import { NavHeader } from './Components/NavHeader';
import { Wishlist } from './Components/Wishlist';

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const initDisplayed: IBook = {
    author: '',
    title: '',
    publisher: '',
    subtitle: '',
    description: '',
    thumbnail: '',
    link: '',
    ISBN: {
      ISBN_10: '',
      ISBN_13: ''
    }
  };
  const initialLibrary = () => {
    const bookLibrary = localStorage.getItem('book-library');
    return bookLibrary !== null ? JSON.parse(bookLibrary) : [];
  };
  const initialWishlist = () => {
    const bookWishlist = localStorage.getItem('wish-list');
    return bookWishlist !== null ? JSON.parse(bookWishlist) : [];
  };
  const [displayed, setDisplayed] = React.useState(initDisplayed);
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [library, setLibrary] = React.useState(initialLibrary);
  const [wishlist, setWishlist] = React.useState(initialWishlist);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    setIsLoaded(true);
  }, [isLoaded]);

  React.useEffect(() => {
    const persistToLibrary = () => {
      localStorage.setItem('book-library', JSON.stringify(library));
      localStorage.setItem('wish-list', JSON.stringify(wishlist));
    };
    window.addEventListener('beforeunload', persistToLibrary);
    return () => {
      window.removeEventListener('beforeunload', persistToLibrary);
    };
  }, [library, wishlist]);

  const searchBooks = (text: string): void => {
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
  const showSnackbar = () => {
    const x = document.getElementById('snackbar');
    x!.className = 'show';
    setTimeout(function() {
      x!.className = x!.className.replace('show', '');
    }, 3000);
  };
  const addBookToLibrary = (book: IBook) => {
    if (
      !library.map((b: IBook) => b.ISBN.ISBN_13).includes(book.ISBN.ISBN_13)
    ) {
      setLibrary([...library, book]);
      if (
        wishlist.map((b: IBook) => b.ISBN.ISBN_13).includes(book.ISBN.ISBN_13)
      ) {
        setWishlist(
          wishlist.filter((b: IBook) => b.ISBN.ISBN_13 !== book.ISBN.ISBN_13)
        );
        setSnackbarText('Book moved from wishlist to library.');
      } else {
        setSnackbarText('Book added to library.');
      }
      showSnackbar();
    }
  };
  const removeBookFromLibrary = (book: IBook) => {
    if (library.map((b: IBook) => b.ISBN.ISBN_13).includes(book.ISBN.ISBN_13)) {
      setLibrary(
        library.filter((b: IBook) => b.ISBN.ISBN_13 !== book.ISBN.ISBN_13)
      );
      setSnackbarText('Book removed from library.');
      showSnackbar();
    }
  };
  const addBookToWishlist = (book: IBook) => {
    if (
      !wishlist.map((b: IBook) => b.ISBN.ISBN_13).includes(book.ISBN.ISBN_13)
    ) {
      setWishlist([...wishlist, book]);
      setSnackbarText('Book added to wishlist.');
      showSnackbar();
    }
  };
  const removeBookFromWishlist = (book: IBook) => {
    if (
      wishlist.map((b: IBook) => b.ISBN.ISBN_13).includes(book.ISBN.ISBN_13)
    ) {
      setWishlist(wishlist.filter((b: IBook) => b !== book));
      setSnackbarText('Book removed from wishlist.');
      showSnackbar();
    }
  };
  return (
    <Router>
      <NavHeader />
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <Container
              displayed={displayed}
              setDisplayed={setDisplayed}
              books={books}
              loading={loading}
              searchBooks={searchBooks}
              isLoaded={isLoaded}
              addBookToLibrary={addBookToLibrary}
              addBookToWishlist={addBookToWishlist}
              library={library}
              wishlist={wishlist}
            />
          )}
        />
        <Route
          path="/library"
          render={() => (
            <BooksOwned
              ownedBooks={library}
              removeFromLibrary={removeBookFromLibrary}
            />
          )}
        />
        <Route
          path="/wishlist"
          render={() => (
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeBookFromWishlist}
            />
          )}
        />
        <Route path="/about" component={About} />
      </div>
      <div id="snackbar">{snackbarText}</div>
    </Router>
  );
};

export default App;
