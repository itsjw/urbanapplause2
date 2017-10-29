import React, { Component } from 'react';
import SelectInput from './SelectInput';

class WorkFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: null,
      artistName: null,
      datePublished: null,
      description: null,
      authorFilter: null,
    }
  }
  setFilters = () => {
    this.props.setFilters(this.state);
  }
  clearFilters = () => {
    const emptyFilters = {
      city: null,
      artistName: null,
      datePublished: null,
      description: null,
      authorFilter: null
    }
    this.props.setFilters(emptyFilters);
    this.setState(...emptyFilters);
    const inputs = document.getElementsByClassName('filter-input')
    Array.prototype.forEach.call(inputs, function(el) {
      el.selectedIndex = 0
    });
    }
  onFilterChange = (e) => {
    console.log(e.target.title);
    var newState = this.state;
    newState[e.target.title] = e.target.value;
    this.setFilters();
  }
  onFilterSelect = (key) => {

  }
  render() {
    return(
      <div className='filter-container'>
        <SelectInput
          matchObjList={this.props.artists}
          onSelectMatch={this.onFilterSelect}
          label='Artist'
          errorText=''
          placeholder='None selected'
          selectedOptionId=''/>


        Filter by Author: <select className='filter-input input' onChange={this.onFilterChange} title='artistName'>
          <option value='null'>--Artist--</option>
          <option value='Birdo'>Birdo</option>
          <option value='Shalack Attack'>Shalack Attack</option>
        </select>

         Posted By: <select className='filter-input input' onChange={this.onFilterChange} title='authorName'>
          <option value='null'>--User--</option>
          <option value='flannj@gmail.com'>flannj@gmail.com</option>
          <option value='ellameno123@gmail.com'>ellameno123@gmail.com</option>
        </select>

        <button onClick={this.clearFilters} className='button'>Clear Filters</button>
      </div>
    )
  }
}

export default WorkFilters;
