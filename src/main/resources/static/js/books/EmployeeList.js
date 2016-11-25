const Employee = require('./Employee');
const React = require('react');

class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var employees = this.props.employees.map(employees =>
            <Employee key={employees.entity._links.self.href}
                      employees={employees}
                      attributes={this.props.attributes}
                      onUpdate={this.props.onUpdate}
                      onDelete={this.props.onDelete}/>
        );

        return (
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Description</th>
                            <th>Year</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}