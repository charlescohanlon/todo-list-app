import React, { Component } from "react";
import "./ListItem.css";

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
    const { item, onComplete } = this.props;
    let inputGroupClasses = "input-group input-group-lg p-1";
    inputGroupClasses += item.isComplete ? " fade-out-transition" : "";
    return (
      <div className={inputGroupClasses}>
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            onChange={(change) => onComplete(item, change.target.checked)}
          />
        </div>
        {item.isEditing
          ? this.editingFields(this.props)
          : this.viewingFields(this.props)}
      </div>
    );
  }
}

export default ListItem;
