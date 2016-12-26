import React from 'react';

function BookEditor({ book }) {
  return (
    <div className="book editor">
      {book ? 'edit book' : 'new book'}
    </div>
  );
}

export default BookEditor;
