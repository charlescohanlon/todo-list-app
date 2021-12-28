import React, { Component } from "react";
import "./ListItem.css";

class ListItem extends Component {
  getTextFieldClasses() {
    let inputClasses = "form-control";
    return inputClasses;
  }

  editingFields(itemIndex, listIndex) {
    return (
      <>
        <input
          type="text"
          className={this.getTextFieldClasses()}
          value={this.props.value}
          onChange={(newText) =>
            this.props.onChange(listIndex, itemIndex, newText.target.value)
          }
        />
        <button
          className="btn btn-primary"
          onClick={() => this.props.onDone(listIndex, itemIndex)}
        >
          Done
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(listIndex, itemIndex)}
        >
          Delete
        </button>
      </>
    );
  }

  viewingFields(itemIndex, listIndex) {
    return (
      <>
        <input
          type="text"
          className={this.getTextFieldClasses()}
          readOnly={true}
          value={this.props.value}
        />
        <button
          className="btn btn-warning"
          onClick={() => {
            this.props.onEdit(listIndex, itemIndex);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  render() {
    const { item, itemIndex, listIndex } = this.props;
    let inputGroupClasses = "input-group input-group-lg";
    inputGroupClasses += item.isComplete ? " fade-out-transition" : "";
    return (
      <div className={inputGroupClasses}>
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            onChange={(change) =>
              this.props.onComplete(listIndex, itemIndex, change.target.checked)
            }
          />
        </div>
        {item.isEditing
          ? this.editingFields(itemIndex, listIndex)
          : this.viewingFields(itemIndex, listIndex)}
      </div>
    );
  }
}

export default ListItem;
