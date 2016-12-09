import React, { Component } from 'react';
import { Link as ReactRouterLink } from 'react-router';

class Link extends Component {
  constructor(props) {
    super(props);
    this.link = null;
    this.linkRef = (r) => this.link = r;
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown(e) {
    this.link.handleClick(e);
  }

  render() {
    return (
      <ReactRouterLink
        {...this.props}
        ref={this.linkRef}
        onMouseDown={this.onMouseDown}
        onClick={this.onClick}
      />
    );
  }
}

export default Link;
