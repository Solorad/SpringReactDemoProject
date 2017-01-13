import React from 'react';
import {Link, browserHistory} from "react-router";
import BookPage from "./pages/BookPage";
import axios from "axios";

import LoginPage  from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import Header from "./common/Header";


const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');

axios.defaults.xsrfHeaderName = csrfTokenHeader;
axios.defaults.headers.common[csrfTokenHeader] = csrfToken;

function App({location}) {

  const url = location.pathname;

  if (url === '/') {
    browserHistory.replace('/books');
    return null;
  }

  return (
    <div className="app">
      <Header currentUrl={url}/>
      {(url === '/books'
          ? <BookPage location={location}/> :
          url === '/login' ? <LoginPage header={csrfTokenHeader} token={csrfToken}/> :
          <Page404 />
      )}
    </div>
  );
}

export default App;
