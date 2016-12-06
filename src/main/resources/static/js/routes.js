import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BookPage from './books/BookPage';

function App({ url, isLoggedIn }) {
    return (
            !isLoggedIn ? <PageLogin /> :
            url === '/' ? <PageMain /> :
            url === '/book' ? <PageAbout /> :
            <Page404 />
);
}

export default (
    <Route path="*" component={AppRouter} />
);