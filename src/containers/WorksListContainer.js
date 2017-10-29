import React from 'react';
import {connect} from 'react-redux';
import WorksList from '../components/WorksList';

import WorkFilters from '../components/WorkFilters.js';

class WorksListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        city: null,
        artistName: null,
        datePublished: null,
        description: null,
        authorFilter: null,
      }
    }
  }

  setFilters = (filters) => {
    console.log(filters);
    this.setState({
      filters: filters
    })
  }

  getFilteredWorks = () => {
    var filteredWorks = this.props.works.data;
    var filters = this.state.filters;
    Object.keys(filters).map((filter) => {
      var worksTemp = {};
      Object.keys(filteredWorks).map((workId) => {
        if ((filteredWorks[workId][filter] == filters[filter])||(filters[filter]==null)) {
          worksTemp[workId] = filteredWorks[workId];
        }
      });
      filteredWorks = worksTemp
    });
    return filteredWorks;
    }


  render() {
   const filteredWorks = this.getFilteredWorks();

    if (this.props.works.hasreceiveddata == true) {
      return (
        <div>
          <div className='card filters-panel'>
            <div className='card-content'>
              <WorkFilters
                setFilters={this.setFilters}
                artists={this.props.artists.data}
              />
            </div>
          </div>
          <WorksList
            works={filteredWorks}
            openFormId={this.props.openFormId}
            onOpenForm={this.props.onOpenForm}
          />
        </div>)

    } else {
      return <div>Loading works...</div>
    }
  }
}

var mapStateToProps = (appState) => {
  return {
    works: appState.works,
    artists: appState.artists
  }
}

export default connect (mapStateToProps)(WorksListContainer);
