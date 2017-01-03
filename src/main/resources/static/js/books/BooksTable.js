import React from 'react';
import { Link } from 'react-router';
import axios from "axios";

function BooksTable({ books, page, pageSize, onBookDeletion }) {
  return (
    <table className="books__table">
      <thead className="books__table__head">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Authors</th>
          <th>Description</th>
          <th>Published</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => (
          <tr key={book.id}>
            <td>{i + page * pageSize + 1}</td>
            <td>{book.title}</td>
            <td>{book.authors}</td>
            <td>{book.description}</td>
            <td>{book.publishDate}</td>
            <td>
              <Link className="btn btn-link" to={{pathname: '/books', query: {editBook: true, book: book.id}}}>Update</Link>
            </td>
            <td>
              <button className="btn btn-warning" onClick={() => deleteBook(book.id, onBookDeletion)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function deleteBook(bookId, onBookDeletion) {
  axios.delete("/api/books/" + bookId);
  onBookDeletion();
}

export default BooksTable;
