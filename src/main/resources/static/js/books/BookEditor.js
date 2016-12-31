import React, {Component} from "react";
import request from "../common/ajax";


class BookEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.book ? props.book.id : '',
      title: props.book ? props.book.title : '',
      authors: props.book ? props.book.authors : '',
      description: props.book ? props.book.description : '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }


  handleSubmit(event) {
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
      <div>
      {/*<div className="book_editor" onSubmit={this.handleSubmit}>*/}
        <div className="editor__row">
          <label>
            Title
            <input type="text" name="title" value={this.state.title} onChange={this.onTitleChange}/>
          </label>
        </div>
        <div className="editor__row">
          <label>
            Authors
            <input type="text" value={this.state.authors} onChange={this.onAuthorChange}/>
          </label>
        </div>
        <div className="editor__row">
          <label>
            Description
            <textarea value={this.state.description} onChange={this.onDescriptionChange}/>
          </label>
        </div>
        <input type="Submit" value="Submit"/>
      </div>
    );
  }
}

export default BookEditor;
