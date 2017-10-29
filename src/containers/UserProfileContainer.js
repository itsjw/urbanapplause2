import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import UserProfile from '../components/UserProfile';

import WorksList from '../components/WorksList';

class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }
  handleEditUserClick = () => {
    this.setState({
      isEditing: true
    });
    this.props.startEdit(this.props.userId);
  }
  handleCancelUserEdit = () => {
    this.setState({
      isEditing: false
    })
  }

  handleSubmitUserEdit = (user) => {
    console.log('handling', user);
    this.props.submitEdit(this.props.userId, user);
    this.setState({
      isEditing: false
    });
  }
    render(){
    if (this.props.users.hasreceiveddata == false) {
      return <span>Loading user...</span>
      } else {
        const userId = this.props.userId;
        const user = this.props.users.data[userId];
        const userWorks={};
        const allWorks = this.props.works.data;
        Object.keys(allWorks).map((workId) => {
          if (allWorks[workId].authorId == userId) {
            userWorks[workId] = allWorks[workId];
            return;
          }
        });
        return (
          <div>
            <h2>Personal Info</h2>
            <UserProfile
              isAuth={(this.props.auth.uid==userId)?true:false}
              qid={userId}
              user={user}
              userWorks={userWorks}
              onEditClick={this.handleEditUserClick}
              onCancelEdit={this.handleCancelUserEdit}
              isEditing={this.state.isEditing}
              onSubmitEdit={this.handleSubmitUserEdit}/>
          <h2>Recently Posted</h2>
            <WorksList works={userWorks} openFormId={null} onOpenForm={this.onOpenForm} />
        </div>

        )
      }
  }
}
var mapStateToProps = (appState) => {
  return {
    works: appState.works,
    users: appState.userprofiles,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
	return {
		startEdit: function(qid){ dispatch(actions.startUserprofileEdit(qid)); },
		cancelEdit: function(qid){ dispatch(actions.cancelUserprofileEdit(qid)); },
		submitEdit: function(qid,content){ dispatch(actions.submitUserprofileEdit(qid,content)); },
		deleteUser: function(qid){ dispatch(actions.deleteUserprofile(qid)); }
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
