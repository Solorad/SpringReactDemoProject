import React from 'react';

function handleSubmit() {}

function BookEditor({ book }) {
  return (
    <form className="book_editor" onSubmit={handleSubmit}>

      {book ? 'edit book' : 'new book'}
    </form>
  );
}

export default BookEditor;
