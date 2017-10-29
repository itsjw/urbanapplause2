import React, { Component } from 'react';

class AuthPanel extends Component {
  render() {
    return(
      <div className='navbar-end'>
        <a className='navbar-item' href={`/users/${this.props.uid}`}>{this.props.email}</a>
        <button className='button navbar-item' onClick={this.props.onLogoutClick}>Logout</button>
      </div>
    )
  }
}

export default AuthPanel;
