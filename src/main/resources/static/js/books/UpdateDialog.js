const React = require('react');

class UpdateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { props, refs } = this;
    const updatedBook = {};

    props.attributes.forEach(a => updatedBook[a] = refs[a].value.trim());
    props.onUpdate(props.book, updatedBook);

    window.location = "#";
  }

  render() {
    const { attributes, book } = this.props;
    const { entity } = book;
    const { href } = entity._links.self;
    const dialogId = `updateBook-${href}`;


    return (
      <div key={href}>
         <a href={`#${dialogId}`}>Update</a>
         <div className="modalDialog" id={dialogId}>
            <a className="close" href="#" title="Close">X</a>
            <h2>Update book</h2>
            <form>
              <label for="">Title</label>
              <input id="title"></input>
              <button onClick={this.handleSubmit}>Update</button>
            </form>
         </div>
      </div>
    );
  }
}

export default UpdateDialog;
