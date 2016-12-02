import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');

// We require the routes and render to the DOM using ReactDOM API
ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById('react')
);