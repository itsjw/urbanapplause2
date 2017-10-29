import React, { Component } from 'react';

import ArtistForm from './ArtistForm';


class ToggleableAddArtist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isFormOpen
    }
  }
  handleSubmit = (artist) => {
    this.props.onSubmit(artist);
  }
  openForm = () => {
    this.setState({
      isOpen: true
    })
  }
  handleCancel = () => {
    this.setState({
      isOpen: false
    })
  }
  render() {

    if (this.state.isOpen == true) {
      return(
        <div className='artist-preview'>
          <ArtistForm onSubmit={this.handleSubmit} artistList={this.props.artistList} onCancel={this.handleCancel}/>
        </div>
        )} else {
          return (
            <button onClick={this.openForm} className='filled'> + New Artist </button>
            )
        }
  }
}

export default ToggleableAddArtist;
