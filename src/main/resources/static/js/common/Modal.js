import React from 'react';
import { Link } from 'react-router';

function onModalClick(event) {
  console.log("there");
  event.stopPropagation();
}

function Modal({ closeAction, children }) {
  return (
    <Link to={{query: { editBook: false }}} activeClassName="active">
      <div className="modal__content" onClick={onModalClick}>
        {children}
      </div>
    </Link>
  );
}

export default Modal;
