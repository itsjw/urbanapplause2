import React, { Component } from 'react';

class SignInPanel extends Component {
  render() {
    return(
      <div className='navbar-end'>
        <button className='navbar-item button' onClick={this.props.onSignInClick}>Sign In</button>
    </div>
    )
  }
}

export default SignInPanel;
