const Book = require('./Book.js');
const React = require('react');

class BookList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // var employees = this.props.employees.map(employees =>
        //     <Book key={employees.entity._links.self.href}
        //               employees={employees}
        //               attributes={this.props.attributes}
        //               onUpdate={this.props.onUpdate}
        //               onDelete={this.props.onDelete}/>
        // );

        return (
            <div>AAAA</div>
            // <div className="row">
            //     <div className="col-md-8">
            //         <table className="table table-striped">
            //             <thead>
            //             <tr>
            //                 <th>#</th>
            //                 <th>Title</th>
            //                 <th>Author</th>
            //                 <th>Description</th>
            //                 <th>Year</th>
            //                 <th>&nbsp;</th>
            //                 <th>&nbsp;</th>
            //             </tr>
            //             </thead>
            //             <tbody>
            //             {employees}
            //             </tbody>
            //         </table>
            //     </div>
            // </div>
        )
    }
}