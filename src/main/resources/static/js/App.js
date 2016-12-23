import React from 'react';
import {Link, browserHistory} from "react-router";
import BookPage from "./pages/BookPage";
import Page404 from "./pages/Page404";
import Header from "./common/Header";

const DEFAULT_LIMIT = 5;


function App({location}) {

  const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
  const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
  const url = location.pathname;

  if (url === '/') {
    browserHistory.replace('/books');
    return null;
  }

  const page = Number(location.query.page) || 0;
  const size = Number(location.query.size) || DEFAULT_LIMIT;
  console.log("t4werwer");

  return (
    <div className="app">
      <Header currentUrl={url}/>
      {(url === '/books'
          ? <BookPage csrfTokenHeader={csrfTokenHeader}
                      csrfToken={csrfToken} page={page} size={size}/> :
          <Page404 />
      )}
    </div>
  );
}

export default App;
