import React from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import ValidationError from "../ValidationError";
import PropTypes from "prop-types";
import "./AddFolder.css";

class AddFolder extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      folder_name: {
        value: "",
        touched: "false"
      }
    };
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault();
    const folder = {
      folder_name: e.target["folderName"].value
    };

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(folder)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/`);
      })
      .catch(error => {
        console.error({ error });
      });
  };
  updateName(name) {
    this.setState({ folder_name: { value: name, touched: true } });
  }

  validateFolderName() {
    const name = this.state.folder_name.value.trim();
    if (name.length === 0) {
      return "Folder name is required";
    } else if (name.length > 20) {
      return "Folder name must be less than 20 characters";
    }
  }

  render() {
    const folderError = this.validateFolderName();

    return (
      <div className="addfolder_section">
        <h2>Create a new folder</h2>
        <form
          className="addFolder_form"
          action="#"
          onSubmit={this.handleSubmit}
          onChange={e => this.updateName(e.target.value)}
        >
          <label htmlFor="folderName">
            <strong>Name of folder:</strong>
          </label>
          <input
            id="folderName"
            type="text"
            name="folderName"
            aria-label="folder name"
            aria-required="true"
          />
          {this.state.folder_name.touched === true && (
            <ValidationError message={folderError} />
          )}
          <button
            type="submit"
            className="button"
            disabled={this.validateFolderName()}
          >
            Submit{" "}
          </button>
        </form>
      </div>
    );
  }
}

export default AddFolder;
