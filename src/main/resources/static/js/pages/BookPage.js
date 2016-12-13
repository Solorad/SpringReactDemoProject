import React from "react";
import "babel-polyfill";
import when from "when";
import client from "../common/client";
import stompClient from "../common/websocket-listener";
import follow from "../common/follow";
import BookList from "../books/BookList";
import NavLinks from "../books/NavLinks";
import BookModalDialog from "../books/BookModalDialog";
import SelectItems from "../books/SelectItems"; // function to hop multiple links by "rel"

const root = '/api';

function BookPage {

  constructor(props) {
    super(props);
    this.state = {
      books: [], attributes: [],
      page: 1, pageSize: 2, links: {},
    };
    this.updatePageSize = this.updatePageSize.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
    this.refreshCurrentPage = this.refreshCurrentPage.bind(this);
    this.refreshAndGoToLastPage = this.refreshAndGoToLastPage.bind(this);
  }

  loadFromServer(pageSize) {
    follow(client, root, [
      {rel: 'books', params: {size: pageSize}}]
    ).then(bookCollection => {
      return client({
        method: 'GET',
        path: bookCollection.entity._links.profile.href,
        headers: {'Accept': 'application/schema+json'}
      }).then(schema => {
        /**
         * Filter unneeded JSON Schema properties, like uri references and
         * subtypes ($ref).
         */
        Object.keys(schema.entity.properties).forEach(function (property) {
          if (schema.entity.properties[property].hasOwnProperty('format') &&
            schema.entity.properties[property].format === 'uri') {
            delete schema.entity.properties[property];
          }
          if (schema.entity.properties[property].hasOwnProperty('$ref')) {
            delete schema.entity.properties[property];
          }
        });

        this.schema = schema.entity;
        this.links = bookCollection.entity._links;
        return bookCollection;
      });
    }).then(bookCollection => {
      this.page = bookCollection.entity.page;
      return bookCollection.entity._embedded.books.map(books =>
        client({
          method: 'GET',
          path: books._links.self.href
        })
      );
    }).then(bookPromises => {
      return when.all(bookPromises);
    }).done(books => {
      this.setState({
        page: this.page,
        books: books,
        attributes: Object.keys(this.schema.properties),
        pageSize: pageSize,
        links: this.links
      });
    });
  }

  showUpdateWindow(book) {

  }

  onNavigate(navUri) {
    client({
      method: 'GET',
      path: navUri
    }).then(bookCollection => {
      this.links = bookCollection.entity._links;
      this.page = bookCollection.entity.page;

      return bookCollection.entity._embedded.books.map(books =>
        client({
          method: 'GET',
          path: books._links.self.href
        })
      );
    }).then(bookPromises => {
      return when.all(bookPromises);
    }).done(books => {
      this.setState({
        page: this.page,
        books: books,
        attributes: Object.keys(this.schema.properties),
        pageSize: this.state.pageSize,
        links: this.links
      });
    });
  }

  updatePageSize(pageSize) {
    if (pageSize !== this.state.pageSize) {
      this.loadFromServer(pageSize);
    }
  }

  refreshAndGoToLastPage() {
    follow(client, root, [{
      rel: 'books',
      params: {size: this.state.pageSize}
    }]).done(response => {
      if (response.entity._links.last !== undefined) {
        this.onNavigate(response.entity._links.last.href);
      } else {
        this.onNavigate(response.entity._links.self.href);
      }
    })
  }

  refreshCurrentPage() {
    follow(client, root, [{
      rel: 'books',
      params: {
        size: this.state.pageSize,
        page: this.state.page.number
      }
    }]).then(bookCollection => {
      this.links = bookCollection.entity._links;
      this.page = bookCollection.entity.page;

      return bookCollection.entity._embedded.books.map(books => {
        return client({
          method: 'GET',
          path: books._links.self.href
        })
      });
    }).then(bookPromises => {
      return when.all(bookPromises);
    }).then(books => {
      this.setState({
        page: this.page,
        books: books,
        attributes: Object.keys(this.schema.properties),
        pageSize: this.state.pageSize,
        links: this.links
      });
    });
  }

  componentDidMount() {
    this.loadFromServer(this.state.pageSize);
    stompClient.register([
      {route: '/topic/newBook', callback: this.refreshAndGoToLastPage},
      {route: '/topic/updateBook', callback: this.refreshCurrentPage},
      {route: '/topic/deleteBook', callback: this.refreshCurrentPage}
    ]);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="float-xs-right">
            <a href="#modalBook">Create</a>
          </div>
        </div>
        <BookList books={this.state.books}
                  page={this.state.page}
                  attributes={this.state.attributes}
                  showUpdateWindow={this.showUpdateWindow}
                  updatePageSize={this.updatePageSize}/>
        <NavLinks links={this.state.links}
                  onNavigate={this.onNavigate}/>
        <BookModalDialog/>
      </div>
    )
  }

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

export default BookPage;
