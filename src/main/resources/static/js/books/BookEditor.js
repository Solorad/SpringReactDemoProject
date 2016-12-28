import React, {Component} from "react";
import request from "../common/ajax";


function handleSubmit(event) {
  console.log(event);
  const body = {};
  request("/api/books", "POST", body)
}

class BookEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.book ? props.book.id : null,
      title: props.book ? props.book.title : null,
      authors: props.book ? props.book.authors : null,
      description: props.book ? props.book.description : null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }


  handleSubmit(event) {
    console.log(event);
    const body = this.state;
    console.log(body);
    request("/api/books", "POST", body)
  }

  onTitleChange(event) {

  }

  onAuthorChange(event) {

  }

  onDescriptionChange(event) {

  }

  render() {
    return (
      <form className="book_editor" onSubmit={handleSubmit}>
        <input type="hidden" name="book_id" value={this.state.id}/>
        <label>
          Title
          <input type="text" name="title" value={this.state.title} onChange={this.onTitleChange}/>
        </label>
        <label>
          Authors
          <input type="text" value={this.state.authors} onChange={this.onAuthorChange}/>
        </label>
        <label>
          Description
          <textarea value={this.state.description} onChange={this.onDescriptionChange}/>
        </label>

        <input type="Submit" value="Submit"/>
      </form>
    );
  }
}

export default BookEditor;
