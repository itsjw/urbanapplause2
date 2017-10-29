import React, { Component } from 'react';

import WorkForm from './WorkForm';


class ToggleableAddWork extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isFormOpen
    }
  }
  handleSubmit = (work) => {
    this.props.onSubmit(work);
    this.props.onOpenForm(null);
  }
  openForm = () => {
    this.props.onOpenForm(0);
  }
  handleCancel = () => {
    this.props.onOpenForm(null);
  }
  render() {

    if (this.props.isFormOpen == true) {
      return(
        <div className='card'>
          <div className='card-content'>
          <button className='button' onClick={this.handleCancel}> X Cancel</button> <h2 className='inline-heading'>Adding New Work</h2>
          <WorkForm onSubmit={this.handleSubmit} artistList={this.props.artistList} onCancel={this.handleCancel}/>
        </div>
      </div>
        )} else {
          return (
            <button className='button is-primary add-work-button' onClick={this.openForm} >
                + New Work
              </button>
            )
        }
  }
}

export default ToggleableAddWork;
