import React, {Component} from "react";
import "babel-polyfill";
import {Link, browserHistory} from 'react-router';
import stompClient from "../common/websocket-listener"; // function to hop multiple links by "rel"
import request from '../common/ajax';
import Modal from '../common/Modal';

import BooksTable from "../books/BooksTable";
import BookEditor from "../books/BookEditor";


class BookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      page : 0,
      totalPages : 1,
      lastPage : 1,
      size: props.initSize,
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.createBook = this.createBook.bind(this);
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

  loadDataFromServer() {
    request("/api/books?page=" + this.props.page + "&size=" + this.state.size)
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

  createBook() {
    console.log("New Book here!");
    this.setState({bookParam : this.state});
  }

  render() {
    return (
      <div className="books">
        <div className="books__header">
          <div className="books__title">Books — Page {this.props.page + 1} of {this.state.totalPages}</div>
          <div className="books__controls">
            <button onClick={this.createBook} className="books__create">
            Create
            </button>
            <select onChange={this.updateSelect} value={this.state.size}>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div className="books__table">
          <BooksTable books={this.state.books} pageSize={this.state.size} page={this.props.page}/>
        </div>
        <div className="books__paginator">
          <PaginatorLink page="0" size={this.state.size} disabled={this.props.page === 0}>&lt;&lt;</PaginatorLink>
          <PaginatorLink page={this.props.page - 1} size={this.state.size}
                         disabled={this.props.page === 0}>&lt;</PaginatorLink>
          <PaginatorLink page={this.props.page + 1} size={this.state.size}
                         disabled={this.props.page === this.state.lastPage}>&gt;</PaginatorLink>
          <PaginatorLink page={this.state.lastPage} size={this.state.size}
                         disabled={this.state.page === this.state.lastPage}>&gt;&gt;</PaginatorLink>
        </div>

        {this.state.bookParam && (
          <Modal closeUrl={`/books?page=${this.props.page}&size=${this.state.size}`}>
            <BookEditor book={this.state.bookParam === 'new' ? null : null  }/>
          </Modal>
        )}
      </div>
    );
  }
}

function PaginatorLink({page, size, disabled, children}) {
  return (
    <Link
      className="books__paginatorLink"
      to={disabled ? null : `/books?page=${page}&size=${size}`}
    >
      {children}
    </Link>
  );
}

export default BookPage;
