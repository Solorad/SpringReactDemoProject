import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import App from './App';
import '../css/App.css';
import '../css/Header.css';
import '../css/BookPage.css';

// We require the routes and render to the DOM using ReactDOM API
ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="*" component={App} />
    </Router>),
  document.getElementById('root')
);