import React, { Component } from 'react';
import ArtistForm from './ArtistForm';
import {memberSince} from '../utils';

class ArtistProfile extends Component {

    onOpenForm = (qid) => {
    console.log('opening', qid);
    }
   render() {
     const {artist, qid, artistWorks} = this.props;

     if (this.props.isEditing) {
       return (
         <ArtistForm
            artistId={qid}
            artistName={artist.name}
            description={artist.description}
            onCancel={this.props.onCancelEdit}
            onSubmit={this.props.onSubmitEdit}/>)
     } else {
      return(
        <div>
          <h2>Artist Information</h2>
          <p>Name: {artist.name}</p>
          <p>Description: {artist.description}</p>
          <p>Member since: {memberSince(artist.dateJoined)}</p>
          <button onClick={this.props.onEditClick}>Edit</button>
        </div>
        )
     }
  }
}

export default ArtistProfile;
