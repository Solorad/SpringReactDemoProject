import React from 'react';
import Book from './Book';

var BookList = React.createClass({

    render() {
        var books = this.props.books.map(book =>
            <Book key={book.entity._links.self.href}
                  book={book}
                      attributes={this.props.attributes}
                      onUpdate={this.props.onUpdate}
                      onDelete={this.props.onDelete}/>
        );

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