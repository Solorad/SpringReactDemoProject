import React from 'react';
import {Link, browserHistory} from "react-router";
import BookPage from "./pages/BookPage";
import Page404 from "./pages/Page404";
import Header from "./common/Header";


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
          <Page404 />
      )}
    </div>
  );
}

export default App;