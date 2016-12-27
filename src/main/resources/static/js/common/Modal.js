import React from 'react';
import { Link } from 'react-router';

function Modal({ closeAction, children }) {
  return (
    <div className="modal" onClick={closeAction}>
      <div className="modal__content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
