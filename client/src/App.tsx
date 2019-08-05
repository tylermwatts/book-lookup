import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IBook } from './../../interfaces/IBook';
import './App.css';
import { About } from './Components/About';
import { BooksOwned } from './Components/BooksOwned';
import { Container } from './Components/Container';
import { NavHeader } from './Components/NavHeader';

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
  const [displayed, setDisplayed] = React.useState(initDisplayed);
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [library, setLibrary] = React.useState(initialLibrary);
  const [wishlist, setWishlist] = React.useState([]);

  React.useEffect(() => {
    setIsLoaded(true);
  }, [isLoaded]);

  React.useEffect(() => {
    const persistToLibrary = () => {
      localStorage.setItem('book-library', JSON.stringify(library));
    };
    window.addEventListener('beforeunload', persistToLibrary);
    return () => {
      window.removeEventListener('beforeunload', persistToLibrary);
    };
  }, [library]);

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
  const addBookToLibrary = (book: IBook) => {
    if (!library.includes(book)) {
      setLibrary([...library, book]);
    }
  };
  const removeBookFromLibrary = (book: IBook) => {
    if (library.includes(book)) {
      setLibrary(library.filter((b: IBook) => b !== book));
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
              library={library}
            />
          )}
        />
        <Route
          path="/library/"
          render={() => (
            <BooksOwned
              ownedBooks={library}
              removeFromLibrary={removeBookFromLibrary}
            />
          )}
        />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
};

export default App;
