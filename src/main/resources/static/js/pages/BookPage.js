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
    this.state = {
      books: [],
      page: Number(props.location.query.page) || 0,
      totalPages: 1,
      lastPage: 1,
      size: Number(props.location.query.size) || DEFAULT_LIMIT,
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.onBookCreation = this.onBookCreation.bind(this);
    this.onBookDeletion = this.onBookDeletion.bind(this);
  }

  componentDidMount() {
    this.loadDataFromServer();

    if (this.props.page < 0 || this.props.page > this.state.lastPage || this.state.size < 1) {
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
    if (page && page !== this.state.page) {
      this.state.page = Number(nextProps.location.query.page);
      this.loadDataFromServer();
    }
  }

  loadDataFromServer() {
    axios.get("/api/books?page=" + this.state.page + "&size=" + this.state.size)
      .then((response) => {
        const data = response.data;
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

  onBookCreation() {
    this.state.page = this.state.lastPage;
    this.loadDataFromServer();
  }

  onBookDeletion() {
    this.state.page = 1;
    this.loadDataFromServer();
  }

  render() {
    const query = this.props.location.query;
    const editBook = query && query.editBook;
    const bookToEdit = query && query.book;

    return (
      <div className="books">
        <div className="books__header">
          <div className="books__title">Books — Page {Number(this.state.page) + 1} of {this.state.totalPages}</div>
          <div className="books__controls">
            <Link to={{pathname: '/books', query: Object.assign({editBook: true}, query)}} className="books__create" activeClassName="active">
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
        <BooksTable books={this.state.books}
                      pageSize={this.state.size} page={this.state.page} onBookDeletion={this.onBookDeletion}/>
        <div className="books__paginator">
          <PaginatorLink page="0" size={this.state.size} disabled={this.state.page === 0}>&lt;&lt;</PaginatorLink>
          <PaginatorLink page={this.state.page - 1} size={this.state.size}
                         disabled={this.state.page <= 0}>&lt;</PaginatorLink>
          <PaginatorLink page={this.state.page + 1} size={this.state.size}
                         disabled={this.state.page === this.state.lastPage}>&gt;</PaginatorLink>
          <PaginatorLink page={this.state.lastPage} size={this.state.size}
                         disabled={this.state.page === this.state.lastPage}>&gt;&gt;</PaginatorLink>
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
