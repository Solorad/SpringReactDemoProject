import React from 'react';
import { Link } from 'react-router';

function onModalClick(event) {
  console.log("there");
  event.stopPropagation();
}

function Modal({ closeAction, children }) {
  return (
    <div className="modal" onClick={closeAction}>
      <div className="modal__content" onClick={onModalClick}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
