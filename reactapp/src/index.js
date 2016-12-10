import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import './index.css';
import './css/App.css';
import './css/Header.css';
import './css/Books.css';

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="*" component={App} />
    </Router>
  ),
  document.getElementById('root')
);
