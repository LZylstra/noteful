import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext';
import config from '../config'
import nextId from "react-id-generator";
import './AddNote.css'


class AddNote extends React.Component {
  static defaultProps ={
    history: {
      goBack: () => { }
    },
    match: {
        params: {}
      },
    onAddNote: () => {},
  }
  state = {
    folders: []
};

  static contextType = ApiContext;
  getDropdownList(folders){
      let foldersreturn = ""
        folders.map(folder=> (
        foldersreturn += `<option = "${folder.name}">${folder.name} </option> `
    ));
    return foldersreturn;
  }
  handleSubmit = e => {
    e.preventDefault()
    let noteId = nextId() + "note";
    let notename = document.getElementById('noteName').value;
    let tempDate = new Date();
    let date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
    let modifiedDate = date;
    let folderID = document.getElementById("folderoption").value;
    let content = document.getElementById('noteContent').value;


    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body:JSON.stringify({
        "id": noteId,
        "name": notename,
        "modified": modifiedDate,
        "folderID": folderID,
        "content": content
      })
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then((data) => {
        this.context.addNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onAddNote(noteId)
      })
      .catch(error => {
        console.error({ error })
      })

      this.props.history.push('/');
  }

  render(){
    const { folders=[] } = this.context
      let folderslist = this.getDropdownList(folders);
      console.log(folderslist)
    return(
      <div className = "addnote_section">
        <form className = "addnote_form">
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
              <strong>Name of note: </strong> 
            <input 
                id= "noteName" 
                type = "text"
            />
            </label>
            <label> 
              <strong>Folder: </strong> 
                <select id = "folderoption">{folderslist}</select>
            </label>
            <label> 
              <strong>Content: </strong> 
                <input 
                    id= "noteContent" 
                    type = "textarea"
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

export default AddNote