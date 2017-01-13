import React from "react";
import {Link} from "react-router";

function LoginPage() {
  return(
    <form name="login" action="/login" method="post">
      <fieldset>
        <legend>Please Login</legend>
        <div>
          <label>
            <span>Username</span>
            <input type="text" id="username" name="username"/>
          </label>
        </div>
        <div className="form-group input-group">
          <label>
            <span>Password</span>
            <input type="password" id="password" name="password"/>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-large btn-primary btn-block">Log in</button>
        </div>
      </fieldset>
    </form>
  )
}

export default LoginPage;