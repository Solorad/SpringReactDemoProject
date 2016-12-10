import React from 'react';

function BookEditor({ book }) {
  return (
    <div>
      {book ? 'edit book' : 'new book'}
    </div>
  );
}

export default BookEditor;
