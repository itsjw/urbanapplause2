import React, { Component } from 'react';
import WorkForm from './WorkForm';

class EditableWorkItem extends Component {

  onEditClick = () => {
    this.props.onStartEdit()
  }
  onCancelClick = () => {
    this.props.onCancelEdit();
    this.setState({
      isEditing: false
    })
  }
  handleUpdateWork = (work) => {
    this.setState({
      isEditing: false
    });
    this.props.onUpdateWork(work);
  }
  render() {
    const work = this.props.work;
    const editOptions = (<footer className='card-footer'><span className='card-footer-item' onClick={this.onEditClick}>Edit</span><span className='card-footer-item' onClick={this.props.onDelete}>Delete</span></footer>);
    if (this.props.isFormOpen) {
      return(
        <div className='card'>
          <div className='card-content'>
            <h2>Editing</h2>
            <WorkForm
              onCancel={this.onCancelClick}
              artistName={work.artistName}
              artistId={work.artistId}
              locName={work.locName}
              locLng={work.locLng}
              locLat={work.locLat}
              file={work.file}
              description={work.description}
              onSubmit={this.handleUpdateWork}
              artistList={this.props.artistList} />
          </div>
        </div>
      )
    } else {
      return(
        <div className="card">
          <div className="card-image">
              <img className='image is-4by2' src={work.file} />
          </div>

          <div className='card-content'>
            <div className='media'>
               <div className='media content'>
                 <h3 className='subtitle'> {work.locName}</h3>
              </div>
            </div>
            <div className='content'>
              <p>Work by <a href={`artists/${work.artistId}`}>{work.artistName}</a>{work.description}</p>

              <p className=''>Posted <strong>{this.props.elapsed_pub} ago </strong>by <a href={'/users/'+work.authorId}>{work.authorName}</a></p>
            </div>
          </div>

            {(this.props.uid==work.authorId)?editOptions:''}
        </div>
      )
  }
  }
}

export default EditableWorkItem;
