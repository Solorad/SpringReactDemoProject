import React from "react";
import "babel-polyfill";
import stompClient from "../common/websocket-listener"; // function to hop multiple links by "rel"
import request from '../common/ajax';
import {Link, browserHistory } from 'react-router';

import BooksTable from "../books/BooksTable";


function BookPage({page, limit}) {
  request("/api/books?page=" + page + "&limit=" + limit)
    .then((data) => {
      const totalPages = data ? data.page.totalPages : 0;
      const lastPage = Math.max(0, totalPages - 1);
      const books = data ? data._embedded.books : [];
      const bookParam = location.query && location.query.book;

      console.log(bookParam);

      // stompClient.register([
      //   {route: '/topic/newBook', callback: browserHistory.push("/books")},
      //   {route: '/topic/updateBook', callback: browserHistory.push("/books")},
      //   {route: '/topic/deleteBook', callback: browserHistory.push("/books")}
      // ]);

      function updateSelect(event){
        console.log(event);
        window.location.href=event.value;
      }

      if (page < 0 || page > lastPage || limit < 1) {
        return <div>404</div>;
      }

      return (
        <div className="books">
          <div className="books__header">
            <div className="books__title">Books — Page {page + 1} of {totalPages}</div>
            <div className="books__controls">
              <Link
                className="books__create"
                to={location.pathname + location.search + (location.search ? '&book=new' : '?book=new')}
              >
                Create
              </Link>
              <select onChange={updateSelect}>
                <option value="/books?limit=2">2</option>
                <option value="/books?limit=5">5</option>
                <option value="/books?limit=7">7</option>
                <option value="/books?limit=10">10</option>
              </select>
            </div>
          </div>
          <div className="books__table">
            <BooksTable books={books} pageSize={limit} page={page}/>
          </div>
          <div className="books__paginator">
            <PaginatorLink page="0" limit={limit} disabled={page === 0}>&lt;&lt;</PaginatorLink>
            <PaginatorLink page={page - 1} limit={limit} disabled={page === 0}>&lt;</PaginatorLink>
            <PaginatorLink page={page + 1} limit={limit} disabled={page === lastPage}>&gt;</PaginatorLink>
            <PaginatorLink page={lastPage} limit={limit} disabled={page === lastPage}>&gt;&gt;</PaginatorLink>
          </div>

          {bookParam && (
            <Modal closeUrl={`/books?page=${page}&limit=${limit}`}>
              <BookEditor book={bookParam === 'new' ? null : null  }/>
            </Modal>
          )}
        </div>
      );
    })
    .catch((err) => {
      return (
        <div>Error occurred on load data! {err}</div>
      );
    });
}

function PaginatorLink({ page, limit, disabled, children }) {
  return (
    <Link
      className="books__paginatorLink"
      to={disabled ? null : `/books?page=${page}&limit=${limit}`}
    >
      {children}
    </Link>
  );
}

export default BookPage;
