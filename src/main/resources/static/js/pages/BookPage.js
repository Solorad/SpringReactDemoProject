import React, {Component} from "react";
import "babel-polyfill";
import {Link, browserHistory} from "react-router";
import request from "../common/ajax";
import Modal from "../common/Modal";
import BooksTable from "../books/BooksTable";
import BookEditor from "../books/BookEditor"; // function to hop multiple links by "rel"


const DEFAULT_LIMIT = 5;

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      page: Number(props.location.query.page) || 0,
      totalPages: 1,
      lastPage: 1,
      size: Number(props.location.query.size) || DEFAULT_LIMIT,
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  componentDidMount() {
    this.loadDataFromServer();

    if (this.props.page < 0 || this.props.page > this.state.lastPage || this.state.size < 1) {
      return <div>404</div>;
    }

    // stompClient.register([
    //   {route: '/topic/newBook', callback: this.refreshAndGoToLastPage},
    //   {route: '/topic/updateBook', callback: this.refreshCurrentPage},
    //   {route: '/topic/deleteBook', callback: this.refreshCurrentPage}
    // ]);
  }

  onMove() {
    this.setState({page: Number(this.props.location.query.page) || 0});
    this.loadDataFromServer();
  }

  loadDataFromServer() {
    request("/api/books?page=" + this.state.page + "&size=" + this.state.size)
      .then((data) => {
        const totalPages = data.page.totalPages;
        this.setState({
          totalPages,
          lastPage: totalPages - 1,
          books: data._embedded.books,
        });
      });
  }

  updateSelect(event) {
    this.state.size = event.target.value;
    browserHistory.replace('/books?size=' + event.target.value);
    this.loadDataFromServer();
  }

  render() {
    const editBook = this.props.location.query && this.props.location.query.editBook;
    return (
      <div className="books">
        <div className="books__header">
          <div className="books__title">Books — Page {this.state.page + 1} of {this.state.totalPages}</div>
          <div className="books__controls">
            <Link to={{pathname: '/books', query: {editBook: true}}} className="books__create" activeClassName="active">
              Create
            </Link>
            <select onChange={this.updateSelect} value={this.state.size}>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div className="books__table">
          <BooksTable books={this.state.books} pageSize={this.state.size} page={this.state.page}/>
        </div>
        <div className="books__paginator">
          <PaginatorLink page="0" size={this.state.size} disabled={this.props.page === 0}>&lt;&lt;</PaginatorLink>
          <PaginatorLink page={this.state.page - 1} size={this.state.size} onMove={this.onMove}
                         disabled={this.state.page <= 0}>&lt;</PaginatorLink>
          <PaginatorLink page={this.state.page + 1} size={this.state.size} onMove={this.onMove}
                         disabled={this.state.page === this.state.lastPage}>&gt;</PaginatorLink>
          <PaginatorLink page={this.state.lastPage} size={this.state.size} onMove={this.onMove}
                         disabled={this.state.page === this.state.lastPage}>&gt;&gt;</PaginatorLink>
        </div>

        {editBook === 'true' && (
          <Modal backUrl='/books'>
            <BookEditor book={this.state.bookParam === 'new' ? null : null  }/>
          </Modal>
        )}
      </div>
    );
  }
}

function PaginatorLink({page, size, disabled, children, onMove}) {
  return (
    <Link
      className="books__paginatorLink"
      to={disabled ? null : `/books?page=${page}&size=${size}`}
      onClick={disabled ? null : onMove}
    >
      {children}
    </Link>
  );
}

export default BookPage;
