import React from 'react';
import { Link, browserHistory } from 'react-router';
import axios from "axios";

function Header({ currentUrl }) {
  return (
    <div className="header">
      <div className="header__left">
        <Link className="header__logo" to="/">Book store</Link>
        <HeaderLink url="/books" active={currentUrl === '/books'}>Books</HeaderLink>
        <HeaderLink url="/lib" active={currentUrl === '/lib'}>Lib</HeaderLink>
      </div>
      <button className="header__logoutButton" onClick={logout}>Logout</button>
    </div>
  );
}

function logout() {
  axios.post("/logout")
    .then(() => {window.location.replace("/")});
}

function HeaderLink({ url, active, children }) {
  const activeClass = active ? 'header__link_active' : '';

  return (
    <Link className={`header__link ${activeClass}`} to={url}>{children}</Link>
  );
}

export default Header;
