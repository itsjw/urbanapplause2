import React, { Component } from 'react';
import ArtistForm from './ArtistForm';

class EditableArtistItem extends Component {

  onEditClick = () => {
    this.props.onStartEdit()
  }
  onCancelClick = () => {
    this.props.onCancelEdit();
    this.setState({
      isEditing: false
    })
  }
  handleUpdateArtist = (artist) => {
    this.setState({
      isEditing: false
    });
    this.props.onUpdateArtist(artist);
  }
  render() {
    const artist = this.props.artist;
    const editOptions = (<span><button onClick={this.onEditClick}>Edit</button><button onClick={this.props.onDelete}>Delete</button></span>);
    if (this.props.isFormOpen) {
      return(
        <div className='artist-preview'>
          <h2>Editing</h2>
          <ArtistForm
            onCancel={this.onCancelClick}
            artistName={artist.artistName}
            artistId={artist.artistId}
            locName={artist.locName}
            locLng={artist.locLng}
            locLat={artist.locLat}
            file={artist.file}
            description={artist.description}
            onSubmit={this.handleUpdateArtist}
            artistList={this.props.artistList} />
        </div>
      )
    } else {
      return(
        <div className='artist-preview'>
          <div className='artist-preview-left'>
            <div className='artist-preview-image'><img src={artist.file} /></div>
          </div>
          <div className='artist-preview-right'>
            <h5>Posted {this.props.elapsed_pub} ago.</h5>
            <ul>
              <li>Artist: {artist.artistName}</li>
              <li> Location: {artist.locName}</li>
              <li>Submitted on: {new Date(artist.datePublished).toDateString()}</li>
              <li>Submitted by: {artist.authorName}</li>
              <li>Description: {artist.description}</li>
            </ul>
            {(this.props.uid==artist.authorId)?editOptions:''}
          </div>
      </div>
      )
  }
  }
}

export default EditableArtistItem;
