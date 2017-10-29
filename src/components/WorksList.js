import React, { Component } from 'react';
var _ = require("lodash");
import WorkItemContainer from '../containers/WorkItemContainer';


class WorksList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const openFormId = this.props.openFormId;
    var onOpenForm = function(qid) {
      this.props.onOpenForm(qid);
    }.bind(this);
    var worksList = _.map(this.props.works,function(work,qid){
          return (
            <WorkItemContainer
              key={qid}
              qid={qid}
              work={work}
              isFormOpen={(openFormId==qid)?true:false}
              onOpenForm={onOpenForm}/>
            )
          }, this).reverse();
this.props.works;
    return(
      <div>
        {worksList}
      </div>
    )
  }
}

export default WorksList;
