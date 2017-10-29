import React, { Component } from 'react';
var _ = require("lodash");
import {memberSince} from '../utils';


class UsersList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.users);
    var usersList = _.map(this.props.users,function(user,qid){
      return (
          <div className='card' key={qid}>
              <div className='card-content'>
                <a href={'/users/'+qid}><h2 className='title is-2'>{user.firstName}</h2></a>
                <span className='subtitle is-4'>Member since {memberSince(user.dateJoined)}</span>
              </div>
            </div>

        )
          }, this).reverse();
    return(
      <div>
        {usersList}
      </div>
    )
  }
}

export default UsersList;
