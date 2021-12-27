import React, { Component } from "react";
import "./ListItem.css";

class ListItem extends Component {
  getTextFieldClasses() {
    let inputClasses = "form-control";
    return (inputClasses += this.props.item.isComplete ? " show-complete" : "");
  }

  editingFields(props) {
    const { value, item } = props;
    return (
      <>
        <input
          type="text"
          className={this.getTextFieldClasses()}
          value={value}
          onChange={(newText) => props.onChange(item, newText.target.value)}
        />
        <button className="btn btn-primary" onClick={() => props.onDone(item)}>
          Done
        </button>
        <button
          className="btn btn-danger"
          onClick={() => props.onDelete(item.id)}
        >
          Delete
        </button>
      </>
    );
  }

  viewingFields(props) {
    const { value, item } = props;
    return (
      <>
        <input
          type="text"
          className={this.getTextFieldClasses()}
          readOnly={true}
          value={value}
        />
        <button
          className="btn btn-warning"
          onClick={() => {
            this.props.onEditing(item);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  render() {
    const { item } = this.props;
    let inputGroupClasses = "input-group input-group-lg";
    inputGroupClasses += item.isComplete ? " fade-out-transition" : "";
    return (
      <div className={inputGroupClasses}>
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            onChange={(change) =>
              this.props.onComplete(item, change.target.checked)
            }
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
