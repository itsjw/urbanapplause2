import React, { Component } from 'react';
import UserForm from './UserForm';

class UserProfile extends Component {
  onOpenForm = (qid) => {
    console.log('opening', qid);
    }
   render() {
     const {user, qid, userWorks} = this.props;
    const memberSince = new Date(user.dateJoined).getFullYear()

    if (this.props.isEditing) {
       return (
         <UserForm
           userId={qid}
           userEmail={user.email}
            firstName={user.firstName}
            description={user.description}
            onCancel={this.props.onCancelEdit}
            onSubmit={this.props.onSubmitEdit}/>)
     } else {

      return(
        <div>
          <p>Name: {this.props.user.firstName}</p>
          <p>Email: {this.props.user.email}</p>
          <p>Bio: {this.props.user.description}</p>
          {(this.props.isAuth==true)?(<button onClick={this.props.onEditClick} className='button'> Edit My Profile</button>):''}
        </div>
        )
     }
  }
}

export default UserProfile;
