import React from 'react';
import { Link } from 'react-router';

function Header({ currentUrl }) {
  return (
    <div className="header">
      <div className="header__left">
        <Link className="header__logo" to="/">Book store</Link>
        <HeaderLink url="/books" active={currentUrl === '/books'}>Books</HeaderLink>
        <HeaderLink url="/lib" active={currentUrl === '/lib'}>Lib</HeaderLink>
      </div>
      <form className="header__logoutForm" action="/logout" method="post">
        <button className="header__logoutButton" type="submit">Logout</button>
      </form>
    </div>
  );
}

function HeaderLink({ url, active, children }) {
  const activeClass = active ? 'header__link_active' : '';

  return (
    <Link className={`header__link ${activeClass}`} to={url}>{children}</Link>
  );
}

export default Header;
