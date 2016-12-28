import React from 'react';
import request from '../common/ajax';


function handleSubmit(event) {
  console.log(event);
  const body = {

  };
  request("/api/books", "POST", body)
}

class BookEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : [],
      page : 0,
      totalPages : 1,
      lastPage : 1,
      size: props.initSize,
    };

    this.updateSelect = this.updateSelect.bind(this);
    this.createBook = this.createBook.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }


  handleSubmit(event) {
    console.log(event);
    const body = {

    };
    request("/api/books", "POST", body)
  }

  render() {
    return (
      <form className="book_editor" onSubmit={handleSubmit}>
        <input type="hidden" name="book_id" value={book ? book.id : ''}/>
        <label>
          Title
          <input type="text" name="title" value={book ? book.title : ''} onChange={this.onTitleChange}/>
        </label>
        <label>
          Author
          <input type="text" value={book ? book.authors : ''} onChange={this.onAuthorChange}/>
        </label>
        <label>
          Description
          <textarea value={book ? book.description : ''} onChange={this.onDescriptionChange}/>
        </label>

        <input type="Submit" value="Submit"/>
      </form>
    );
  }
}

export default BookEditor;
