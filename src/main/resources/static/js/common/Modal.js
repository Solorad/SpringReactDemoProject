import React from 'react';
import { Link } from 'react-router';

function onModalClick(event) {
  console.log("there");
  event.stopPropagation();
}

function Modal({ backUrl, children }) {
  return (
    <Link to={{pathname: backUrl}} activeClassName="active" className="modal">
      <div className="modal__content" onClick={onModalClick}>
        {children}
      </div>
    </Link>
  );
}

export default Modal;
