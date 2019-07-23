import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Container from './Components/Container/Container';
import NavHeader from './Components/NavHeader/NavHeader';

function App() {
  return (
    <Router>
      <NavHeader />
      <div>
        <Route exact path="/" component={Container} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
}

export default App;
