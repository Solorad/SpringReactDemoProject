import React from "react";
import {Link} from "react-router";

function onModalClick(event) {
  console.log("there");
  event.stopPropagation();
}

function Modal({backUrl, query, children}) {
  delete query.editBook;
  return (
    <div className="modal">
      <Link to={{pathname: backUrl, query: query}} className="modal__link">
      </Link>
      <div className="modal__content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
