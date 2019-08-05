import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.css';

export interface NavHeaderProps {}

export const NavHeader: React.SFC<NavHeaderProps> = () => {
  const [active, setActive] = React.useState('search');

  React.useEffect(() => {
    document.getElementById(active)!.classList.add('active');
  }, [active]);

  const activator = (id: string): void => {
    const links = document.getElementsByClassName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].id === id) {
        links[i].classList.add('active');
        setActive(links[i].id);
      } else {
        links[i].classList.remove('active');
      }
    }
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
            to="/library/"
          >
            Books Owned
          </Link>
        </li>
        <li className="li">
          <Link
            id="about"
            className="link"
            onClick={() => activator('about')}
            to="/about/"
          >
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};
