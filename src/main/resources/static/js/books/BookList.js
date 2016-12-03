import React from "react";
import Book from "./Book";

var BookList = React.createClass({

  render() {
    var books = [];
    for(let i = 0; i < this.props.books.length; i++) {
      var curBook = this.props.books[i];
      curBook.bookOrder = this.props.page * this.props.pageSize + i + 1;
      books.push(<Book book={curBook}
                       showUpdateWindow={this.props.showUpdateWindow}/>);
    }

    return (
      <div className="row">
        <table className="table table-striped book-table">
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
          {books}
          </tbody>
        </table>
      </div>
    )
  }
});

export default BookList;