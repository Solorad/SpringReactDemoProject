import React from "react";
import {Link} from "react-router";

function Modal({backUrl, query, children}) {
  let newQuery = Object.assign({}, query);
  delete newQuery.editBook;
  delete newQuery.book;
  return (
    <div className="modal">
      <Link to={{pathname: backUrl, query: newQuery}} className="modal__link">
      </Link>
      <div className="modal__content">
        {children}
      </div>
    </div>
  );
}

export default Modal;
