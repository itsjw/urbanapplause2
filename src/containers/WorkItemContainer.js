import React, { Component } from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import EditableWorkItem from '../components/EditableWorkItem';

class WorkItemContainer extends Component {
  handleStartEdit = () => {
    this.props.onOpenForm(this.props.qid);
  }
  handleCancelEdit = () => {
    this.props.onOpenForm(null);
  }
  handleSubmitEdit = (work) => {
    console.log(work);
    this.props.submitEdit(this.props.qid, work);
    this.handleCancelEdit();
  }
  handleDeleteWork = () => {
    this.props.deleteWork(this.props.qid);
  }
  getTimeElapsed = () => {
    const published = new Date(this.props.work.datePublished);
    const now = Date.now()
    const milliseconds = now - published;
    var seconds = milliseconds / 1000;
    if (seconds < 55) {
      return Math.round(seconds) + ' seconds';
    }
    var minutes = seconds / 60;

    if (minutes < 55) {
      return Math.round(minutes) +' minutes';
    }
    var hours = minutes/60;
    if (hours < 23) {
      return Math.round(hours) +' hours';
    }
    var days = hours / 24;
    if (days < 7) {
      return Math.round(days) +' days';
    }
  }
render() {
  const timeDiff = this.getTimeElapsed();


    return(

      <div>
        <EditableWorkItem
          uid={this.props.auth.uid}
          qid={this.props.qid}
          work={this.props.work}
          elapsed_pub={timeDiff}
          onEdit={this.props.startEdit}
          onCancelEdit={this.handleCancelEdit}
          onDelete={this.handleDeleteWork}
          onUpdateWork={this.handleSubmitEdit}
          artistList={this.props.artists.data}
          isFormOpen={this.props.isFormOpen}
          onStartEdit={this.handleStartEdit} />
      </div>
    )
  }
}
var mapStateToProps = (appState) => {
  return {
    works: appState.works,
    artists: appState.artists,
    auth: appState.auth
  }
}
var mapDispatchToProps = function(dispatch){
	return {
		startEdit: function(qid){ dispatch(actions.startWorkEdit(qid)); },
		cancelEdit: function(qid){ dispatch(actions.cancelWorkEdit(qid)); },
		submitEdit: function(qid,content){ dispatch(actions.submitWorkEdit(qid,content)); },
		deleteWork: function(qid){ dispatch(actions.deleteWork(qid)); }
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(WorkItemContainer);
