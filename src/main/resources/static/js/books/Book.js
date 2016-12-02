import React from 'react';
import UpdateDialog from './UpdateDialog.js';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.book);
    }

    render() {
        return (
            <tr>
                <td></td>
                <td>{this.props.book.entity.title}</td>
                <td>{this.props.book.entity.authors}</td>
                <td>{this.props.book.entity.description}</td>
                <td>{this.props.book.entity.publishDate}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>
                    <UpdateDialog book={this.props.book}
                                  attributes={this.props.attributes}
                                  onUpdate={this.props.onUpdate}/>
                </td>
                <td>
                    <button onClick={this.handleDelete} className="btn btn-warning">Delete</button>
                </td>
            </tr>
        )
    }
}

export default Book;