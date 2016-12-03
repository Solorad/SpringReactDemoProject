import React from "react";
import ReactDOM from "react-dom";
import client from '../common/client';

class BookModalDialog extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var newBook = {};
    this.props.attributes.forEach(attribute => {
      newBook[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
    });
    this.props.onCreate(newBook);
    this.props.attributes.forEach(attribute => {
      ReactDOM.findDOMNode(this.refs[attribute]).value = ''; // clear out the dialog's inputs
    });
    window.location = "#";
  }

  createBook(newBook) {
    client({
      method: 'POST',
      path: '/api/books',
      entity: newBook,
      headers: {
        'Content-Type': 'application/json',
        csrfTokenHeader : csrfToken
      }
    })
  }

  updateBook(book, updatedBook) {
    client({
      method: 'PUT',
      path: book.entity._links.self.href,
      entity: updatedBook,
      headers: {
        'Content-Type': 'application/json',
        'If-Match': book.headers.Etag,
        csrfTokenHeader : csrfToken
      }
    }).done(response => {
      /* Let the websocket handler update the state */
    }, response => {
      if (response.status.code === 403) {
        alert('ACCESS DENIED: You are not authorized to update ' +
          book.entity._links.self.href);
      }
      if (response.status.code === 412) {
        alert('DENIED: Unable to update ' + book.entity._links.self.href +
          '. Your copy is stale.');
      }
    });
  }

  render() {
    return (
      <div>
        <div id="modalBook" className="modalDialog">
          <div>
            <a href="#" title="Close" className="close">X</a>

            <h2>Create new book</h2>

            <form>
              <div className="form-group row">
                <label htmlFor={titleId} className="col-xs-2 col-form-label">Author</label>
                <div className="col-xs-10">
                  <input id={titleId}/>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor={titleId} className="col-xs-2 col-form-label">Title</label>
                <div className="col-xs-10">
                  <input id={titleId}/>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor={titleId} className="col-xs-2 col-form-label">Title</label>
                <div className="col-xs-10">
                  <input id={titleId}/>
                </div>
              </div>
              <button onClick={this.handleSubmit}>Create</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default BookModalDialog;