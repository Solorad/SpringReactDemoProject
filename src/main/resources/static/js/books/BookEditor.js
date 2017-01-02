import React, {Component} from "react";
import axios from "axios";


class BookEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.book ? props.book.id : null,
      title: props.book ? props.book.title : '',
      authors: props.book ? props.book.authors : '',
      description: props.book ? props.book.description : '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  componentDidMount() {
    if (this.props.book != null) {
      axios.get("/api/books/" + this.props.book)
        .then((response) => {
          this.setState({
            id : response.data.id,
            title : response.data.title,
            authors : response.data.authors,
            description : response.data.description,
          })
        })
    }
  }


  handleSubmit(event) {
    const body = this.state;
    const csrfHeader = this.props.csrfTokenHeader;
    const csrfToken = this.props.csrfToken;
    console.log(body);
    axios.post("/api/books", body,
      {
        headers: { csrfHeader : csrfToken},
    })
  }

  onTitleChange(event) {
    this.setState({title : event.target.value})
  }

  onAuthorChange(event) {
    this.setState({authors : [event.target.value]})
  }

  onDescriptionChange(event) {
    this.setState({description : event.target.value})
  }

  render() {
    return (
      <form className="book_editor" onSubmit={this.handleSubmit}>
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
        <input className="submit__button" type="Submit" value="Submit"/>
      </form>
    );
  }
}

export default BookEditor;
