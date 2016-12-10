import React from 'react';
import { Link } from 'react-router';

function BooksTable({ books, page, pageSize }) {
  return (
    <table className="booksTable">
      <thead>
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
          <tr>
            <td>{i + page * pageSize}</td>
            <td>{book.title}</td>
            <td>{book.authors}</td>
            <td>{book.description}</td>
            <td>{book.publishDate}</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>
              <Link className="btn btn-link" to={location.pathname + location.search + `&book=${i}`}>Update</Link>
            </td>
            <td>
              <Link className="btn btn-warning">Delete</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BooksTable;
