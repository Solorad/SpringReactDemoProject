const React = require('react');
const ReactDOM = require('react-dom');

class SelectItemsPerPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        e.preventDefault();
        var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
        if (/^[0-9]+$/.test(pageSize)) {
            this.props.updatePageSize(pageSize);
        } else {
            ReactDOM.findDOMNode(this.refs.pageSize).value = pageSize.substring(0, pageSize.length - 1);
        }
    }

    render() {
        return (
            <select ref="pageSize" defaultValue={this.props.pageSize} onChange={this.handleInput} className="form-control">
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="10">10</option>
            </select>
        )
    }
}