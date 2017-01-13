import React, {Component} from "react";
import "babel-polyfill";
import {Link, browserHistory} from "react-router";
import axios from "axios";
import Modal from "../common/Modal";
var stompClient = require('../common/websocket-listener');
import BooksTable from "../books/BooksTable";
import BookEditor from "../books/BookEditor"; // function to hop multiple links by "rel"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const DEFAULT_LIMIT = 5;

class BookPage extends Component {
  constructor(props) {
    super(props);
    this.books = [];
    this.page = Number(props.location.query.page) || 0;
    this.totalPages = 1;
    this.lastPage = 1;
    this.size = Number(props.location.query.size) || DEFAULT_LIMIT;

    this.updateSelect = this.updateSelect.bind(this);
    this.onBookCreation = this.onBookCreation.bind(this);
    this.onBookDeletion = this.onBookDeletion.bind(this);
  }

  componentDidMount() {
    this.loadDataFromServer();

    if (this.props.page < 1 || this.props.page > this.lastPage || this.size < 1) {
      return <div>404</div>;
    }

    stompClient.register([
      {route: '/topic/newBook', callback: this.loadDataFromServer.bind(this)},
      {route: '/topic/updateBook', callback: this.loadDataFromServer.bind(this)},
      {route: '/topic/deleteBook', callback: this.loadDataFromServer.bind(this)}
    ]);
  }

  componentWillReceiveProps(nextProps) {
    var page = nextProps.location.query.page;
    if (page && page !== this.page) {
      this.page = Number(nextProps.location.query.page);
      this.loadDataFromServer();
    }
  }

  loadDataFromServer() {
    axios.get("/api/books?page=" + this.page + "&size=" + this.size)
      .then((response) => {
        const data = response.data;
        this.totalPages = Math.max(data.page.totalPages, 1);
        this.lastPage = this.totalPages;
        this.books = data._embedded.books;
        this.forceUpdate();
      });
  }

  updateSelect(event) {
    this.size = event.target.value;
    browserHistory.replace('/books?size=' + event.target.value);
    this.loadDataFromServer();
  }

  onBookCreation() {
    this.page = this.lastPage - 1;
    this.loadDataFromServer();
  }

  onBookDeletion() {
    this.page = 0;
    this.loadDataFromServer();
  }

  render() {
    const query = this.props.location.query;
    const editBook = query && query.editBook;
    const bookToEdit = query && query.book;

    return (
      <div className="books">
        <div className="books__header">
          <div className="books__title">Books — Page {Number(this.page) + 1} of {this.totalPages}</div>
          <div className="books__controls">
            <Link to={{pathname: '/books', query: Object.assign({editBook: true}, query)}} className="books__create" activeClassName="active">
              Create
            </Link>
            <select className="books__header__select" onChange={this.updateSelect} value={this.size}>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <BooksTable books={this.books}
                      pageSize={this.size} page={this.page} onBookDeletion={this.onBookDeletion}/>
        <div className="books__paginator">
          <PaginatorLink page="0" size={this.size} disabled={this.page === 0}>&lt;&lt;</PaginatorLink>
          <PaginatorLink page={this.page - 1} size={this.size}
                         disabled={this.page <= 0}>&lt;</PaginatorLink>
          <PaginatorLink page={this.page + 1} size={this.size}
                         disabled={this.page >= (Number(this.lastPage) - 1)}>&gt;</PaginatorLink>
          <PaginatorLink page={this.lastPage - 1} size={this.size}
                         disabled={this.page >= (Number(this.lastPage) - 1)}>&gt;&gt;</PaginatorLink>
        </div>

        {editBook === 'true' && (
          <ReactCSSTransitionGroup
            component="div"
            transitionName="modalWindow"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            <Modal backUrl={this.props.location.pathname} query={query}>
              <BookEditor book={bookToEdit} onCreation={this.onBookCreation}/>
            </Modal>
          </ReactCSSTransitionGroup>
        )}
      </div>
    );
  }
}

function PaginatorLink({page, size, disabled, children}) {
  return (
    <Link
      className="books__paginatorLink"
      to={disabled ? null : {pathname : '/books', query : {page, size}}}>
    {children}
    </Link>
  );
}

export default BookPage;
