import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import ArtistProfile from '../components/ArtistProfile';

import WorksList from '../components/WorksList';

class ArtistItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }
  handleEditArtistClick = () => {
    this.setState({
      isEditing: true
    });
    this.props.startEdit(this.props.artistId);
  }
  handleCancelArtistEdit = () => {
    this.setState({
      isEditing: false
    })
  }

  handleSubmitArtistEdit = (artist) => {
    this.props.submitEdit(this.props.artistId, artist);
    this.setState({
      isEditing: false
    });
  }
    render(){
    if (this.props.artists.hasreceiveddata == false) {
      return <span>Loading artist...</span>
      } else {
        const artistId = this.props.artistId;
        const artist = this.props.artists.data[artistId];
        const artistWorks={};
        const allWorks = this.props.works.data;
        Object.keys(allWorks).map((workId) => {
          if (allWorks[workId].artistId == artistId) {
            artistWorks[workId] = allWorks[workId];
            return;
          }
        });
        return (
          <div>
          <ArtistProfile qid={artistId} artist={artist} artistWorks={artistWorks} onEditClick={this.handleEditArtistClick} onCancelEdit={this.handleCancelArtistEdit} isEditing={this.state.isEditing} onSubmitEdit={this.handleSubmitArtistEdit}/>
          <h2>Recent Works</h2>
          <WorksList works={artistWorks} openFormId={null} onOpenForm={this.onOpenForm} />
        </div>

        )
      }
  }
}
var mapStateToProps = (appState) => {
  return {
    works: appState.works,
    artists: appState.artists,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
	return {
		startEdit: function(qid){ dispatch(actions.startArtistEdit(qid)); },
		cancelEdit: function(qid){ dispatch(actions.cancelArtistEdit(qid)); },
		submitEdit: function(qid,content){ dispatch(actions.submitArtistEdit(qid,content)); },
		deleteArtist: function(qid){ dispatch(actions.deleteArtist(qid)); }
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(ArtistItemContainer);
