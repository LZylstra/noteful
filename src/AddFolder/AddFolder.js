import React from 'react'
import ApiContext from '../ApiContext';
import config from '../config'


class AddFolder extends React.Component {
  static defaultProps ={
    onAddFolder: () => {},
  }

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const folderId = this.props.id

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.addFolder(folderId)
        // allow parent to perform extra behaviour
        this.props.onAddFolder(folderId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render(){
    return(
        <form>
            <label> 
              <strong>Name of folder:</strong> 
            <input 
                id= "foldername" 
                type = "text"
                onChange = {this.handleTextChange}
            />
            </label>
            <button type = "submit">Submit </button>
        </form>
    );
  }
}

export default AddFolder