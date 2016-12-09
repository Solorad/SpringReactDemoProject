import React from 'react';
import Link from '../common/Link';

function Page404() {
  return (
    <div className="page404">
      <div className="page404__text">
        404. Page Not Found
      </div>
      <Link className="page404__toMain" to="/">
        go to main page
      </Link>
    </div>
  );
}

export default Page404;