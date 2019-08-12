import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.css';

export interface NavHeaderProps {}

export const NavHeader: React.SFC<NavHeaderProps> = () => {
  const getActive = (path: string) => {
    switch (path) {
      case '/':
        return 'search';
      case '/library':
        return 'library';
      case '/about':
        return 'about';
      case '/wishlist':
        return 'wishlist';
      default:
        return 'search';
    }
  };

  const active = getActive(window.location.pathname);

  React.useEffect(() => {
    activator(active);
  }, [active]);

  const activator = (id: string): void => {
    document.getElementById(id)!.classList.add('active');
    Array.from(document.getElementsByClassName('link'))
      .filter(l => l.id !== id)
      .map(inactive => inactive.classList.remove('active'));
  };

  return (
    <div className="navheader">
      <ul className="ul">
        <li className="li">
          <Link
            id="search"
            className="link"
            onClick={() => activator('search')}
            to="/"
          >
            Search
          </Link>
        </li>
        <li className="li">
          <Link
            id="library"
            className="link"
            onClick={() => activator('library')}
            to="/library"
          >
            Books Owned
          </Link>
        </li>
        <li className="li">
          <Link
            id="wishlist"
            className="link"
            onClick={() => activator('wishlist')}
            to="/wishlist"
          >
            My Wishlist
          </Link>
        </li>
        <li className="li">
          <Link
            id="about"
            className="link"
            onClick={() => activator('about')}
            to="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};
