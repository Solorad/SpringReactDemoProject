import React, {Component} from "react";
import {Link} from "react-router";
import axios from "axios";


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.username = '';
    this.password = '';
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.login = this.login.bind(this);
  }

  onUsernameChange(event) {
    this.username = event.target.value;
    this.forceUpdate();
  }

  onPasswordChange(event) {
    this.password = event.target.value;
    this.forceUpdate();
  }

  login(event) {
    const body = this.state;
    console.log(body);
    axios.post("/login", {
      username : this.username,
      password : this.password
    });
  }

  render() {
    return (
      <div>
        <legend>Please Login</legend>
        <div>
          <label>
            <span>Username</span>
            <input type="text" id="username" name="username" value={this.username} onChange={this.onUsernameChange}/>
          </label>
        </div>
        <div className="form-group input-group">
          <label>
            <span>Password</span>
            <input type="password" id="password" name="password" value={this.password}
                   onChange={this.onPasswordChange}/>
          </label>
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-large btn-primary btn-block" value="Log in" onClick={this.login}/>
        </div>
      </div>
    )
  }
}

export default LoginPage;