import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import ArtistItemContainer from '../containers/ArtistItemContainer';
import ArtistProfile from '../components/ArtistProfile';

class ArtistProfilePage extends Component {
  render() {
    const artistId =  this.props.match.params.artistId;
    const match = this.props.match.url;
    return(
      <ArtistItemContainer artistId={artistId}>
        <Switch>
          <Route exact path={`${match}`} component={ArtistProfile}/>
        </Switch>
      </ArtistItemContainer>

    )
  }
}

export default ArtistProfilePage;
