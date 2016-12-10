import React from 'react';
import { Link, browserHistory } from 'react-router';
import ajax from '../utils/ajax';
import Header from './Header';
import Books from './Books';

const DEFAULT_LIMIT = 3;

function App({ location }) {
  const url = location.pathname;

  if (url === '/') {
    browserHistory.replace('/books');
    return null;
  }

  const page = Number(location.query.page) || 0;
  const limit = Number(location.query.limit) || DEFAULT_LIMIT;

  return (
    <div className="app">
      <Header currentUrl={url} />
      <div className="app__content">
        {(
          url === '/books' ? <Books page={page} limit={limit} /> :
          '404 pages'
        )}
      </div>
    </div>
  );
}

export default App;
