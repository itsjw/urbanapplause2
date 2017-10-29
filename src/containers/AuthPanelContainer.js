import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../actions';

import AuthPanel from '../components/AuthPanel';
import SignInPanel from '../components/SignInPanel';
import C from '../constants';

class AuthPanelContainer extends Component {
  render() {

    const {auth} = this.props;
    return (
      <div>
        {(() => {
          switch(auth.currently) {
            case C.LOGGED_IN:
              return <AuthPanel uid={auth.uid} email={auth.email} onLogoutClick={this.props.logoutUser}/>;
            case C.AWAITING_AUTH_RESPONSE:
              return <span>Verifying...</span>
            default:
              return <SignInPanel onSignInClick={this.props.attemptGoogleLogin}/>
            }
            })()}
          </div>
          )
  }
}

var mapStateToProps = (appState) => {
  return {
    auth: appState.auth
  }
}

var mapDispatchToProps = function (dispatch) {
  return {
    attemptGoogleLogin: function(){ dispatch(actions.attemptGoogleLogin()); },
    logoutUser: function(){ dispatch(actions.logoutUser()); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPanelContainer);
