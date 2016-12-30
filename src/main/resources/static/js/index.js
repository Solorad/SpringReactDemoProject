import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';

// We require the routes and render to the DOM using ReactDOM API
ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="*" component={App} />
    </Router>),
  document.getElementById('root')
);