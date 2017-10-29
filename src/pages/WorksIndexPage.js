import React, { Component } from 'react';
import WorksListContainer from '../containers/WorksListContainer';
import NewWorkContainer from '../containers/NewWorkContainer';

class WorksIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFormId: null
    }
  }
  onOpenForm = (id) => {
    this.setState({
      openFormId: id
    });
  }
  render() {
    return(
      <div>
        <h1>Works</h1>
        <NewWorkContainer isFormOpen={(this.state.openFormId==0)?true:false} onOpenForm={this.onOpenForm}/>
        <WorksListContainer openFormId={this.state.openFormId} onOpenForm={this.onOpenForm}/>
      </div>
    )
  }
}

export default WorksIndexPage;
