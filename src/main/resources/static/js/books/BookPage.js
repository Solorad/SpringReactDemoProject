'use strict';

import 'babel-polyfill';
import React from 'react';
const ReactDOM = require('react-dom');
const when = require('when');
const client = require('../common/client');
var stompClient = require('../common/websocket-listener');
const follow = require('../common/follow'); // function to hop multiple links by "rel"

import BookList  from './BookList';
import NavLinks from './NavLinks';
import CreateDialog from './CreateDialog';
import SelectItems from './SelectItems';

const root = '/api';

const csrfTokenHeader = document.querySelector('meta[name="_csrf_header"]').getAttribute('content');
const csrfToken = document.querySelector('meta[name="_csrf"]').getAttribute('content');

class BookPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {books: [], attributes: [], page: 1, pageSize: 2, links: {}};
        this.updatePageSize = this.updatePageSize.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
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

    onCreate(newBook) {
        follow(client, root, ['books']).done(response => {
            client({
                method: 'POST',
                path: response.entity._links.self.href,
                entity: newBook,
                headers: {
                    'Content-Type': 'application/json',
                    csrfTokenHeader : csrfToken
                }
            })
        })
    }

    onUpdate(book, updatedBook) {
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

    onDelete(book) {
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
        var pageInfo = this.state.page.hasOwnProperty("number") ?
            <h3 className="col-xs-4">Books - Page {this.state.page.number + 1} of {this.state.page.totalPages}</h3> : null;
        return (
            <div>
                <div className="row">
                    {pageInfo}
                    <div className="float-xs-right">
                        <CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
                        <SelectItems pageSize={this.props.pageSize}
                                     updatePageSize={this.updatePageSize}/>
                    </div>
                </div>
                <BookList books={this.state.books}
                          pageSize={this.state.pageSize}
                          attributes={this.state.attributes}
                          onUpdate={this.onUpdate}
                          onDelete={this.onDelete}
                          updatePageSize={this.updatePageSize}/>
                <NavLinks links={this.state.links}
                          onNavigate={this.onNavigate}/>
            </div>
        )
    }
}

export default BookPage;
