import React, { Component } from "react";

class ListItem extends Component {
  render() {
    const { isEditing } = this.props;
    let buttons = isEditing ? (
      <>
        <button className="btn btn-primary" onClick={() => this.handleDone}>
          Done
        </button>
        <button className="btn btn-danger" onClick={() => this.handleDelete}>
          Delete
        </button>
      </>
    ) : (
      <button className="btn btn-warning" onClick={() => this.handleEditing}>
        Edit
      </button>
    );
    return (
      <div className="input-group p-1">
        <div className="input-group-text">
          <input className="form-check-input mt-0" type="checkbox" />
        </div>
        <input type="text" className="form-control" readOnly={!isEditing} />
        {buttons}
      </div>
    );
  }
}

export default ListItem;
