import React, { Component } from 'react';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      activeMatchIndex: 0,
      selectedOptionId: this.props.selectedOptionId||null,
      selectedOptionName: this.props.selectedOptionName||null,
      showMatches: false,
      matchList: [],
      isCreatingNew: false
    }
  }
  onInputChange = (e) => {
    this.setState({
      textInput: e.target.value,
      selectedOptionId: null,
      selectedOptionName: null,
      showMatches: true,
    });
    var matchList = this.props.matchObjList;
    var matches = {};
    Object.keys(matchList).map((key) => {
      if (matchList[key].name.toLowerCase().indexOf(e.target.value.toLowerCase())>-1) {
        matches[key] = matchList[key];
      }
    });
    this.setState({
      matchList: matches
    });
  }

  onKeyDown = (e) => {
    const {activeMatchIndex, matchList} = this.state;
    const maxLength = Object.keys(this.state.matchList).length;

    if (e.keyCode == 13) {
      e.preventDefault();
      if(activeMatchIndex == maxLength) {
        console.log('creating new');
      } else {
        Object.keys(matchList).map((key, index) => {
          if (index==activeMatchIndex) {
            this.selectMatch(key);
          }
        });
      }
    }
    if (e.keyCode == 40) { //down key pressed
      if(activeMatchIndex < maxLength) {
        console.log(activeMatchIndex);
        this.setState({
          activeMatchIndex: this.state.activeMatchIndex+1});
      }
    }
    if (e.keyCode == 38) {
      if(activeMatchIndex > 0) {
        this.setState({
          activeMatchIndex: activeMatchIndex- 1
        })
      }
    }
  }
  selectMatch = (key) => {
    this.setState({
      selectedOptionId: key,
      selectedOptionName: this.state.matchList[key].name,
      showMatches: false
    });
    this.props.onSelectMatch(key);

  }
  onCreateNewClick = () => {
    this.setState({
      showMatches: false,
      isCreatingNew: true
    })
  }
  cancelCreatingNew = () => {
    this.setState({
      isCreatingNew: false
    })
  }
  render() {
    const matches = this.state.matchList;
    const result = Object.keys(matches).map((key, index) =>
        <a
          key={key}
          value={key}
          className={(this.state.activeMatchIndex==index)?'dropdown-item is-active':'dropdown-item'}
          onClick={(e) => this.selectMatch(key)}>
            {matches[key].name}
      </a>

      )
    const createForm = (
      <div>
      <div className='popup-background'></div>
      <div className='popup-form card'>
        <div className='card-content'>
          <h2>Create New {this.props.label}</h2>
          Name: <input type='text' className='input' ref='newName'/>
          <button className='button' onClick={this.cancelCreatingNew}>Cancel</button><button className='button' onClick={((e) => this.props.onCreateNew(this.refs.newName.value))}>Submit</button>
        </div>
      </div>
    </div>
      );
    return(
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{this.props.label||''}</label>
        </div>
        <div className="field-body">

          <div className={(this.state.showMatches==true)?"dropdown is-active select-input":"select-input"}>
            <div className="dropdown-trigger select-input">
              <input
                className={`input ${this.state.selectedOptionId?'is-success':''} ${(this.props.errorText.length>0)?'is-danger':''}`}
                type='text'
                value={this.state.selectedOptionName||this.state.textInput}
                onChange={this.onInputChange}
                onKeyDown={this.onKeyDown}
                placeholder={this.props.placeholder}
              />
            </div>
            <div className='dropdown-menu'>
              <div className='dropdown-content'>
                {result}
                <hr className="dropdown-divider"/>
                <a className={(this.state.activeMatchIndex==Object.keys(this.state.matchList).length)?'dropdown-item is-active':'dropdown-item'} onClick={this.onCreateNewClick}
>
                    Create new artist
                </a>
              </div>
            </div>
        </div>
      </div>
      {this.state.isCreatingNew?createForm:''}
    </div>
    )
  }
}

export default SelectInput;
