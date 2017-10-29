import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './store';
import actions from './actions';

import Navbar from './components/Navbar';
import WorksIndexPage from './pages/WorksIndexPage';
import UserProfilePage from './pages/UserProfilePage';
import ArtistsIndexPage from './pages/ArtistsIndexPage';

import UsersIndexPage from './pages/UsersIndexPage';
import './sass/main.scss';



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className='wrapper'>
        <Navbar />
        <Switch>
          <Route exact path='/' render={() => (<Redirect to='/works' />)} />
          <Route exact path='/works' component={WorksIndexPage} />
          <Route path='/users' component={UsersIndexPage}/>
          <Route path='/artists' component={ArtistsIndexPage}/>

          <Route path='/' render={() => (<div>no match</div>)} />
        </Switch>
      </div>
    </Router>
  </Provider>, document.getElementById('root'));

setTimeout(function(){
  store.dispatch( actions.startListeningToAuth() );
  store.dispatch( actions.startListeningToWorks() );
  store.dispatch( actions.startListeningToArtists() );
  store.dispatch( actions.startListeningToUserprofiles() );
});

