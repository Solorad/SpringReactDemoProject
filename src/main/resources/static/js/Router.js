import React from "react";
import {Route, IndexRoute} from "react-router";
import BookPage from "./pages/BookPage";
import Page404 from "./pages/Page404";

function AppRouter({url}) {
  const isAuthenticated = document.querySelector('meta[name="isAuthenticated"]').getAttribute('content');
  const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
  const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');

  return (
    !isAuthenticated ? <PageLogin /> :
      url === '/'
        ? <BookPage csrfTokenHeader={csrfTokenHeader}
                      csrfToken={csrfToken}/> :
        url === '/book'
          ? <BookPage csrfTokenHeader={csrfTokenHeader}
                      csrfToken={csrfToken}/> :
          <Page404 />
  );
}

export default (
  <Route path="*" component={AppRouter}/>
);