import React, { Component } from 'react';

class ShowMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedMatch: 0
    }
  }
  onMatchClick = (key, artistName) => console.log(key, artistName);
  render() {
    const {isInputEmpty, matchObjList, onMatchClick, isMatchSelected} = this.props;
    var result = '';
    if (isInputEmpty) {
    } else if (!isInputEmpty && Object.keys(matchObjList).length == 0) {
      result = (<div>No matches</div>)
    } else if (isMatchSelected==true) {
    } else {
      result = Object.keys(matchObjList).map((key, index) =>
        <li
          key={key}
          value={index}
          className={(this.state.highlightedMatch==index)?'highlighted-match':''}
          onClick={(e) => this.props.onMatchClick(key, matchObjList[key].name)}>
            {matchObjList[key].name}
        </li>)
    }
    return(
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label"></label>
        </div>
        <div className="field-body">
          <ul className="field work-match-list">
            {result}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowMatches;
