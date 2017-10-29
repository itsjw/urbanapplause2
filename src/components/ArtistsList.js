import React, { Component } from 'react';
var _ = require("lodash");
import {memberSince} from '../utils';


class ArtistsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var artistsList = _.map(this.props.artists,function(artist,qid){
          return (
            <div className='card' key={qid}>
              <div className='card-content'>
                <a href={'/artists/'+qid}><h2 className='title is-2'>{artist.name}</h2></a>
                <span className='subtitle is-4'>Member since {memberSince(artist.dateJoined)}</span>
              </div>
            </div>
            )
          }, this).reverse();
    return(
      <div>
        {artistsList}
      </div>
    )
  }
}

export default ArtistsList;
