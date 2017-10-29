import React, { Component } from 'react';
import {connect} from 'react-redux';
var _ = require("lodash");
import ArtistsList from '../components/ArtistsList';


class ArtistsListContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.artists.hasreceiveddata == false) {
      return <span>Loading artists...</span>
    } else {
      return(
      <ArtistsList
        artists={this.props.artists.data} />
      )
    }
  }
}
var mapStateToProps = (appState) => {
  return {
    artists: appState.artists,
  }
}

export default connect (mapStateToProps)(ArtistsListContainer);
