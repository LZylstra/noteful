import React from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import ValidationError from "../ValidationError";
import PropTypes from "prop-types";
import "./AddNote.css";

class AddNote extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      note_name: {
        value: "",
        touched: "false"
      },
      content: {
        value: "",
        touched: "false"
      },
      folderid: {
        touched: "false"
      }
    };
  }

  static contextType = ApiContext;

  updateName(name) {
    this.setState({ note_name: { value: name, touched: true } });
  }

  updateContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }

  validateNoteName() {
    const name = this.state.note_name.value.trim();
    if (name.length === 0) {
      return "Note name is required";
    } else if (name.length > 20) {
      return "Note name must be less than 20 characters";
    }
  }

  validateContent() {
    const content = this.state.content.value.trim();
    if (content.length === 0) {
      return "Note cannot be blank";
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let newModified = new Date();

    const newNote = {
      note_name: e.target["noteName"].value,
      content: e.target["noteContent"].value,
      folderid: e.target["folderOptionId"].value,
      date_modified: newModified
    };

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newNote)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(note => {
        this.context.addNote(note);
        this.props.history.goBack(`/folder/${note.folderid}`);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { folders = [] } = this.context;

    return (
      <div className="addnote_section">
        <h2>Create a new note</h2>
        <form className="addnote_form" action="#" onSubmit={this.handleSubmit}>
          <label htmlFor="noteName">Name of note: </label>
          <input
            id="noteName"
            type="text"
            name="noteName"
            aria-label="note name"
            aria-required="true"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.note_name.touched === true && (
            <ValidationError message={this.validateNoteName()} />
          )}

          <label htmlFor="noteContent">Content: </label>
          <textarea
            id="noteContent"
            name="noteContent"
            aria-label="note contents"
            aria-required="true"
            onChange={e => this.updateContent(e.target.value)}
          />
          {this.state.content.touched === true && (
            <ValidationError message={this.validateContent()} />
          )}

          <label htmlFor="folderOption">Folder: </label>
          <select
            id="folderOption"
            name="folderOptionId"
            aria-label="Select folder to place note"
            aria-required="true"
            required
          >
            <option value="">Select Folder</option>
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>
                {folder.folder_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="button"
            disabled={this.validateContent() || this.validateNoteName()}
          >
            Submit{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote;
