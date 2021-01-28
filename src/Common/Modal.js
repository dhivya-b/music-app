import React from "react";

class Modal extends React.Component {
  state = {
    playlistName: this.props.name,
    description: "",
  };

  save = () => {
    this.props.onSave(this.state.playlistName, this.state.description);
  };

  onNameChange = (evt) => {
    this.setState({ playlistName: evt.target.value });
  };

  onDescriptionChange = (evt) => {
    this.setState({ description: evt.target.value });
  };

  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <p>Create Playlist</p>
            <p className="cursor-pointer" onClick={this.props.onClose}>
              x
            </p>
          </div>
          <div className="modal-body">
            <div className="decoration-container">
              <i className="fa fa-music"></i>
            </div>
            <div>
              <input
                onChange={this.onNameChange}
                value={this.state.playlistName}
                className="input-fileds"
              ></input>
              <textarea
                onChange={this.onDescriptionChange}
                value={this.state.description}
                placeholder="Add description"
                className="input-fileds"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className={`${
                this.state.playlistName.length === 0 ? "disabled" : null
              }`}
              onClick={this.save}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
