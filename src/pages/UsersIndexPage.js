import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import UsersListContainer from '../containers/UsersListContainer';
import UserProfileContainer from '../containers/UserProfileContainer';

class UsersIndexPage extends Component {
  constructor(props) {
    super(props);
    }
  render() {
    return(
      <Switch>
        <Route exact path={`${this.props.match.url}`}
          render={() =>(
            <div>
              <h1>Users</h1>
              <UsersListContainer />
            </div>
              )}
            />
            <Route path={`${this.props.match.url}/:userId`}
              render={({match}) => (
              <div>
                <a href='/users' className='page-navigation'>&#8592; Back to Users</a>
                <UserProfileContainer userId={match.params.userId}/>
              </div>
              )}
            />
      </Switch>

    )
  }
}

export default UsersIndexPage;
