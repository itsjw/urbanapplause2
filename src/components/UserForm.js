import React, { Component } from 'react';
import TextInput from './TextInput';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId || null,
      firstName: this.props.firstName||'',
      description: this.props.description || '',
      errors: {
        firstName: false,
        description:false
      }
    }
  }
  onUserNameChange = (e) => {
    this.setState({
      firstName: e.target.value,
    });
    }
  onDescriptionChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }
  validateForm = () => {
    var didError = false;
    var newErrors = this.state.errors;
    if (this.state.firstName=='') {
      newErrors.userId = 'Please select a valid name';
      didError = true;
    }
    if (this.state.description == '') {
    newErrors.description = 'Description field cannot be blank';
      didError = true;
    }
    this.setState({
      errors: newErrors
    });
    return didError;
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const didError = this.validateForm();
    if (didError == true) {
      return;
    }
    const user = {
      firstName: this.state.firstName,
      description: this.state.description,
      email: this.props.userEmail
    }
    this.props.onSubmit(user);
    this.props.onCancel();
    }
  render() {
    return(
      <div>
        <form method='post' action='/' onSubmit={this.handleSubmit}>

          <TextInput
            type='text'
            refName='firstName'
            label="User"
            value={this.state.firstName}
            onChange={this.onUserNameChange}
            errorMsg={this.state.errors.firstName}
          />

          <TextInput
            label='Description'
            type='text'
            ref='description'
            value={this.state.description}
            onChange={this.onDescriptionChange}
            errorMsg={this.state.errors.description}
          />

          <input className='button' type='submit' value='Submit'/>
          <button onClick={this.props.onCancel}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default UserForm;
