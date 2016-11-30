const React = require('react');
const ReactDOM = require('react-dom');

class UpdateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { props, refs } = this;
    const updatedEmployee = {};

    props.attributes.forEach(a => updatedEmployee[a] = refs[a].value.trim());
    props.onUpdate(props.employees, updatedEmployee);

    window.location = "#";
  }

  render() {
    const { attributes, employees } = this.props;
    const { entity } = employees;
    const { href } = entity._links.self;
    const dialogId = `updateEmployee-${href}`;

    return (
      <div key={href}>
         <a href={`#${dialogId}`}>Update</a>
         <div className="modalDialog" id={dialogId}>
            <a className="close" href="#" title="Close">X</a>
            <h2>Update an employees</h2>
            <form>
              {attributes.map(attribute => (
                <p key={entity[attribute]}>
                  <input
                    className="field"
                    type="text"
                    placeholder={attribute}
                    defaultValue={entity[attribute]}
                    ref={attribute}
                  />
                </p>
              ))}
              <button onClick={this.handleSubmit}>Update</button>
            </form>
         </div>
      </div>
    );
  }
}

export default UpdateDialog;
