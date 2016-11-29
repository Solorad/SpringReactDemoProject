import React from 'react';
import UpdateDialog from './UpdateDialog.js';

class Book extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete(this.props.employees);
    }

    render() {
        return (
            <tr>
                <td></td>
                <td>{this.props.employees.entity.firstName}</td>
                <td>{this.props.employees.entity.lastName}</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>
                    <UpdateDialog employees={this.props.employees}
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