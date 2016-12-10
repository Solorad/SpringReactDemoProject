import React from 'react';
import { Link } from 'react-router';
import BooksTable from './BooksTable';
import Modal from './Modal';
import BookEditor from './BookEditor';
import ajax from '../utils/ajax';

function Books({ page, limit }) {
  const data = ajax.get({ page, limit });
  const totalPages = data.page.totalPages;
  const lastPage = totalPages - 1;
  const books = data._embedded.books;
  const bookParam = location.query && location.query.book;

  console.log(bookParam);

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
        </div>
      </div>
      <div className="books__table">
        <BooksTable books={books} pageSize={limit} page={page} />
      </div>
      <div className="books__paginator">
        <PaginatorLink page="0" limit={limit} disabled={page === 0}>&lt;&lt;</PaginatorLink>
        <PaginatorLink page={page - 1} limit={limit} disabled={page === 0}>&lt;</PaginatorLink>
        <PaginatorLink page={page + 1} limit={limit} disabled={page === lastPage}>&gt;</PaginatorLink>
        <PaginatorLink page={lastPage} limit={limit} disabled={page === lastPage}>&gt;&gt;</PaginatorLink>
      </div>

      {bookParam && (
        <Modal closeUrl={`/books?page=${page}&limit=${limit}`}>
          <BookEditor book={bookParam === 'new' ? null : null  } />
        </Modal>
      )}
    </div>
  );
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

export default Books;
