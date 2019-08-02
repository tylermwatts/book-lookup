import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IBook } from './../../interfaces/IBook';
import './App.css';
import { About } from './Components/About';
import { Container } from './Components/Container';
import { NavHeader } from './Components/NavHeader';

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const initDisplayed: IBook = {
    author: '',
    title: '',
    subtitle: '',
    description: '',
    thumbnail: '',
    link: '',
    ISBN: {
      ISBN_10: '',
      ISBN_13: ''
    }
  };
  const [displayed, setDisplayed] = React.useState(initDisplayed);
  const [books, setBooks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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
            />
          )}
        />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
};

export default App;
