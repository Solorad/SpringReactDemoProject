import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import axios from "axios";

const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');
axios.defaults.xsrfHeaderName = csrfTokenHeader;
axios.defaults.headers.common[csrfTokenHeader] = csrfToken;


// We require the routes and render to the DOM using ReactDOM API
ReactDOM.render(
    (<Router history={browserHistory}>
        <Route path="*" component={App} />
    </Router>),
  document.getElementById('root')
);