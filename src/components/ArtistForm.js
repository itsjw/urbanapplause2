import React, { Component } from 'react';
import TextInput from './TextInput';

class ArtistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistId: this.props.artistId || null,
      artistName: this.props.artistName||'',
      description: this.props.description || '',
      errors: {
        artistName: false,
        description:false
      }
    }
  }
  onArtistNameChange = (e) => {
    this.setState({
      artistName: e.target.value,
    });
    }
  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }
  validateForm = () => {
    var didError = false;
    var newErrors = this.state.errors;
    if (this.state.artistName=='') {
      newErrors.artistId = 'Please select a valid name';
      didError = true;
    }
    if (this.state.description == '') {
    newErrors.description = 'Description field cannot be blank';
      didError = true;
    }
    this.setState({
      errors: newErrors
    });
    return didError;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const didError = this.validateForm();
    if (didError == true) {
      return;
    }
    const artist = {
      name: this.state.artistName,
      description: this.state.description,
    }
    this.props.onSubmit(artist);
    this.props.onCancel();
    }
  render() {
    return(
      <div>
        <form method='post' action='/' onSubmit={this.handleSubmit}>

          <TextInput
            type='text'
            refName='artistName'
            label="Artist"
            value={this.state.artistName}
            onChange={this.onArtistNameChange}
            errorMsg={this.state.errors.artistName}
          />

          <TextInput
            label='Description'
            type='text'
            ref='description'
            value={this.state.description}
            onChange={this.onDescriptionChange}
            errorMsg={this.state.errors.description}
          />

          <input className='button' type='submit' value='Submit'/>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default ArtistForm;
