import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext';
import config from '../config'
import nextId from "react-id-generator";
import './AddFolder.css'


class AddFolder extends React.Component {
  static defaultProps ={
    history: {
      goBack: () => { }
    },
    match: {
      params: {}
    },
    onAddFolder: () => {},
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    let folderId = nextId() + "folder";
    let foldername = document.getElementById('folderName').value;
    console.log(foldername)

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body:JSON.stringify({
        "id": folderId,
        "name": foldername
      })
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((data) => {
        this.context.addFolder(folderId)
        // allow parent to perform extra behaviour
        this.props.onAddFolder(folderId)
        console.log(data)
      })
      .catch(error => {
        console.error({ error })
      })

      this.props.history.push('/');
  }

  render(){
    return(
      <div className = "addfolder_section">
        <form className = "addFolder_form">
          {/* <CircleButton
              tag='button'
              role='link'
              onClick={() => this.props.history.goBack()}
              className='NotePageNav__back-button'
          >
              <FontAwesomeIcon icon='chevron-left' />
              <br />
              Back
          </CircleButton> */}
            <label> 
              <strong>Name of folder:</strong> 
            <input 
                id= "folderName" 
                type = "text"
            />
            </label>
            <button 
              type = "submit"
              onClick = {this.handleSubmit}
            >Submit </button>
        </form>
      </div>
    );
  }
}

export default AddFolder