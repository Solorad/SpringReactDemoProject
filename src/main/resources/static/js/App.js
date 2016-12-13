import React from 'react';
import {Route, IndexRoute} from "react-router";
import BookPage from "./pages/BookPage";
import Page404 from "./pages/Page404";

function App({location}) {

  const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
  const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
  const url = location.pathname;

  if (url === '/') {
    browserHistory.replace('/books');
    return null;
  }

  return (
    <div className="app">
      <Header currentUrl={url}/>
      {(url === '/book'
          ? <BookPage csrfTokenHeader={csrfTokenHeader}
                      csrfToken={csrfToken} page={page} limit={limit}/> :
          <Page404 />
      )}
    </div>
  );
}

export default App;
