import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../actions';
import {getAddressComponents} from '../utils';

import ToggleableAddWork from '../components/ToggleableAddWork';

class NewWorkContainer extends Component {
  handleSubmit = (work) => {
    work.authorId = this.props.auth.uid;
    work.authorName = this.props.auth.email;
    work.datePublished = Date.now();
    work.dateUpdated = Date.now();
    this.props.submitNewWork(work);
  }

  render() {
    if (this.props.auth.uid) {
      return (
        <div>
          {this.props.works.submittingNew?<span> Posting new work...</span>:<ToggleableAddWork onSubmit={this.handleSubmit} artistList={this.props.artists.data} isFormOpen={this.props.isFormOpen} onOpenForm={this.props.onOpenForm}/>}
        </div>
        )
    } else {
      return (<span>Login to add a work</span>);
      }
    }
}


var mapStateToProps = function(appState) {
  return {
    auth: appState.auth,
    works: appState.works,
    artists: appState.artists
  }
}
var mapDispatchToProps = function(dispatch){
	return {
		submitNewWork: function(content){ dispatch(actions.submitNewWork(content)); },
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NewWorkContainer);

