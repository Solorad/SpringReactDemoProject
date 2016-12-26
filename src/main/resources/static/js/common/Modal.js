import React from 'react';
import { Link } from 'react-router';

function Modal({ closeUrl, children }) {
  return (
    <Link className="modal" to={closeUrl}>
      <div className="modal__content">
        {children}
      </div>
    </Link>
  );
}

export default Modal;
