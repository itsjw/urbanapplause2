import React, { Component } from 'react';
import {getUploadsImUrl} from './../utils';
import TextInput from './TextInput';
import FileInput from './FileInput';
import SelectInput from './SelectInput';
import MapContainer from '../containers/MapContainer';
import {getAddressComponents} from '../utils';

class WorkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artistId: this.props.artistId || null,
      fileUrl: this.props.file || '',
      artistNameInput: this.props.artistName || '',
      artistName: this.props.artistName||'',
      artistMatches: {},
      fileUpload: this.props.file?'complete':null,
      description: this.props.description || '',
      locLng: this.props.locLng || null,
      locLat: this.props.locLat || null,
      locName: this.props.locName || '',
      locInput: this.props.locName || '',
      place: this.props.place ||'',
      isEditingImage: this.props.file?false:true,
      errors: {
        file: false,
        artistId: false,
        loc: false,
        description:false
      }
    }
  }
  onCreateNewArtist = (name) => {
    console.log(name);
  }
  onArtistMatchSelect = (key) => {
    var newErrors = this.state.errors;
    newErrors.artistId = false;
    this.setState({
      artistName: this.props.artistList[key].name,
      artistNameInput: this.props.artistList[key].name,
      artistId: key,
      errors: newErrors
    });
  }
  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }
  onLocationChange= (place) => {
    this.setState({
      locLng: place.geometry.location.lng(),
      locLat: place.geometry.location.lat(),
      locName: place.formatted_address,
      place: place,
    });
    this.validateForm();
  }
  onLocationInputChange = (e) => {
    this.setState({
      locInput: e.target.value
    });
    this.validateForm();
  }
  validateForm = () => {
    var didError = false;
    var newErrors = this.state.errors;
    if (this.state.artistId==null) {
      newErrors.artistId = 'Please select a valid artist';
      didError = true;
    }
    if (this.state.fileUpload == null) {
      newErrors.file = 'Choose an image of the work'
      didError = true;
    }
    if (this.state.locName == ''|| this.state.locLat==null ||this.state.locLng==null) {
      newErrors.loc = 'Please choose a valid location'
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
    const work = {
      artistName: this.state.artistName,
      artistId: this.state.artistId,
      file: this.state.fileUrl,
      description: this.state.description,
      locLng: this.state.locLng,
      locLat: this.state.locLat,
      locName: this.state.locName,
      place: getAddressComponents(this.state.place),
    }
        if (this.state.fileUpload =='pending') { //wait for file to be uploaded to UploadsIm
      setTimeout(this.handleSubmit(e), 500);
    } else if (this.state.fileUpload == 'complete') {
      this.props.onSubmit(work);
    } else {
     return;
    }
  }

  onFileChange = (e) => {
    this.setState({
      fileUrl: '',
      fileUpload: 'pending'
    })
    var file    = document.querySelector('input[type=file]').files[0];
    getUploadsImUrl(file).then((url) => {
      var errors = this.state.errors;
      errors.fileUpload = false;
      this.setState({
        fileUrl: url,
        fileUpload: 'complete',
        errors: errors
      });
    });
    var reader  = new FileReader();
    reader.addEventListener("load", function () {

    }, false)
  this.setState({
    isEditingImage: false
  });
  }

    render() {
    const isArtistInputEmpty = (this.state.artistNameInput.length>0)?false:true;
    const isMatchSelected = (this.state.artistId?true:false);
    return(
      <div>
        <form method='post' action='/' onSubmit={this.handleSubmit}>

              <FileInput
                className='file-input'
                type='file'
                refName='photoFile'
                title='Choose an image'
                label="Choose a photo..."
                onChange={this.onFileChange}
                errorMsg={this.state.errors.file}
                imgUrl={this.state.fileUrl}
                fileUpload={this.state.fileUpload}
              />
            <div className='work-preview-right'>

        <SelectInput
            label='Artist'
            matchObjList={this.props.artistList}
            onSelectMatch={this.onArtistMatchSelect}
            errorText=''
            placeholder='Start typing to find artists...'
            onCreateNew={this.onCreateNewArtist}
          />
          <TextInput
            label='Description'
            type='text'
            ref='description'
            value={this.state.description}
            onChange={this.onDescriptionChange}
            errorMsg={this.state.errors.description}
          />
          <TextInput
              label='Location'
              type='text'
              ref='loc'
              idName='searchTextField'
              className='controls'
              onChange={this.onLocationInputChange}
              errorMsg={this.state.errors.loc}
              defaultValue={this.state.locName}
            />


              <MapContainer onLocationChange={this.onLocationChange} mapId={'map'+Date.now()}>
                              </MapContainer>
              <input className='button is-primary' type='submit' value='Submit'/>
              <button className='button' onClick={this.props.onCancel}>Cancel</button>

            </div>
            <div className='work-preview-footer'>
                  </div>
        </form>
      </div>
    )
  }
}

export default WorkForm;
