import * as React from 'react';
import { Link } from 'react-router-dom';
import './NavHeader.css';

export interface NavHeaderProps {}

const NavHeader: React.SFC<NavHeaderProps> = () => {
  React.useEffect(() => {
    document.getElementById('search')!.classList.add('active');
  });

  const activator = (id: string) => {
    const links = document.getElementsByClassName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].id === id) {
        links[i].classList.add('active');
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

export default NavHeader;
