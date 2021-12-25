import React, { Component } from "react";

class ListItem extends Component {
  editingFields(props) {
    return (
      <>
        <input
          type="text"
          className="form-control"
          value={props.value}
          onChange={(newText) =>
            props.onChange(props.item, newText.target.value)
          }
        />
        <button
          className="btn btn-primary"
          onClick={() => props.onDone(props.item)}
        >
          Done
        </button>
        <button
          className="btn btn-danger"
          onClick={() => props.onDelete(props.item.id)}
        >
          Delete
        </button>
      </>
    );
  }

  viewingFields(props) {
    return (
      <>
        <input
          type="text"
          className="form-control"
          readOnly={true}
          value={props.value}
        />
        <button
          className="btn btn-warning"
          onClick={() => {
            this.props.onEditing(props.item);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  render() {
    return (
      <div className="input-group input-group-lg p-1">
        <div className="input-group-text">
          <input className="form-check-input mt-0" type="checkbox" />
        </div>
        {this.props.item.isEditing
          ? this.editingFields(this.props)
          : this.viewingFields(this.props)}
      </div>
    );
  }
}

export default ListItem;
