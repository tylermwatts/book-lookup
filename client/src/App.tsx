import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSpring } from 'react-spring';
import './App.css';
import About from './Components/About/About';
import Container from './Components/Container/Container';
import NavHeader from './Components/NavHeader/NavHeader';

export interface AppProps {}

const App: React.SFC<AppProps> = () => {
  const spring: any = {
    to: [{ opacity: 1 }, { color: 'black' }],
    from: { opacity: 0, color: '#fcfcfc' }
  };
  const animation = useSpring(spring);
  const AnimatedContainer = () => <Container animationStyle={animation} />;
  return (
    <Router>
      <NavHeader />
      <div>
        <Route exact path="/" component={AnimatedContainer} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
};

export default App;
