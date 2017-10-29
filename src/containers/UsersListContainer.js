import React, { Component } from 'react';
import {connect} from 'react-redux';
var _ = require("lodash");
import UsersList from '../components/UsersList';


class UsersListContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.users.hasreceiveddata == false) {
      return <span>Loading users...</span>
      } else {
        console.log(this.props.users);
      return(
      <UsersList
        users={this.props.users.data} />
      )
    }
  }
}
var mapStateToProps = (appState) => {
  return {
    users: appState.userprofiles,
  }
}

export default connect (mapStateToProps)(UsersListContainer);
