import React from "react";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
    this.showUpdateWindow = this.props.showUpdateWindow.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.book);
  }

  deleteBook(book) {
    client({
      method: 'DELETE',
      path: book.entity._links.self.href,
      headers: {
        csrfTokenHeader : csrfToken
      }}
    ).done(response => {/* let the websocket handle updating the UI */},
      response => {
        if (response.status.code === 403) {
          alert('ACCESS DENIED: You are not authorized to delete ' +
            book.entity._links.self.href);
        }
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.book.bookOrder}</td>
        <td>{this.props.book.entity.title}</td>
        <td>{this.props.book.entity.authors}</td>
        <td>{this.props.book.entity.description}</td>
        <td>{this.props.book.entity.publishDate}</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>
          <button onClick={this.showUpdateWindow} className="btn btn-link">Update</button>
        </td>
        <td>
          <button onClick={this.deleteBook} className="btn btn-warning">Delete</button>
        </td>
      </tr>
    )
  }
}

export default Book;