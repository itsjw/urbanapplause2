import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import ArtistsListContainer from '../containers/ArtistsListContainer';
import NewArtistContainer from '../containers/NewArtistContainer';
import ArtistItemContainer from '../containers/ArtistItemContainer';

class ArtistsIndexPage extends Component {
  constructor(props) {
    super(props);
    }
  render() {
    return(
      <Switch>
        <Route exact path={`${this.props.match.url}`}
          render={() =>(
            <div>
              <h1>Artists</h1>
              <NewArtistContainer/>
              <ArtistsListContainer />
            </div>
              )}
            />
            <Route path={`${this.props.match.url}/:artistId`} render={({match}) => (
              <div>
                <a href='/artists' className='page-navigation'>&#8592; Back to Artists</a>
                <ArtistItemContainer artistId={match.params.artistId}/>
              </div>
              )}
            />
      </Switch>

    )
  }
}

export default ArtistsIndexPage;
