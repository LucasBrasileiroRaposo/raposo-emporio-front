import Logo from '../logo/Logo';
import { HashLink } from 'react-router-hash-link';
import './Navbar.css';

export default function Navbar({ links = [] }) {

  return (
    <header className="navbar">
      <Logo />
      <nav className="navbar__nav">
        {links.map((link) => 
        (
            <HashLink
              smooth
              key={link.href}
              to={link.href}
              className="navbar__link"
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick();
                }
              }}
            >
              {link.label}
            </HashLink>
          )
        )}
      </nav>
    </header>
  );
}
