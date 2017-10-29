import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';

import ToggleableAddArtist from '../components/ToggleableAddArtist';

class NewArtistContainer extends Component {
  handleSubmit = (artist) => {
    artist.authorId = this.props.auth.uid;
    artist.authorName = this.props.auth.email;
    artist.dateJoined= Date.now();
    artist.dateUpdated = Date.now();
    this.props.submitNewArtist(artist);
  }

  render() {
    if (this.props.auth.uid) {
      return (
        <div>
          {this.props.artists.submittingNew?<span> Posting new artist...</span>:<ToggleableAddArtist onSubmit={this.handleSubmit} artistList={this.props.artists.data} isFormOpen={this.props.isFormOpen} onOpenForm={this.props.onOpenForm}/>}
        </div>
        )
    } else {
      return (<span>Login to add a artist</span>);
      }
    }
}


var mapStateToProps = function(appState) {
  return {
    auth: appState.auth,
    artists: appState.artists,
    artists: appState.artists
  }
}
var mapDispatchToProps = function(dispatch){
	return {
		submitNewArtist: function(content){ dispatch(actions.submitNewArtist(content)); },
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NewArtistContainer);

