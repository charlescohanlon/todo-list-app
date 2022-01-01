import React, { Component } from "react";
import "./ListItem.css";

class ListItem extends Component {
  getTextFieldClasses() {
    let inputClasses = "form-control";
    // inputClasses += this.props.item.isComplete ? " show-complete" : "";
    return inputClasses;
  }

  editingFields(item, pos) {
    return (
      <>
        <input
          type="text"
          className={this.getTextFieldClasses()}
          value={item.value}
          onChange={(newText) => this.props.onChange(pos, newText.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => this.props.onDone(pos)}
        >
          Done
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(pos)}
        >
          Delete
        </button>
      </>
    );
  }

  viewingFields(item, pos) {
    return (
      <>
        <div className="input-group-text">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            value={true}
            onChange={(change) =>
              this.props.onComplete(pos, change.target.checked)
            }
          />
        </div>
        <input
          type="text"
          className={this.getTextFieldClasses()}
          readOnly={true}
          value={item.value}
        />
        <button
          className="btn btn-warning"
          onClick={() => {
            this.props.onEdit(pos);
          }}
        >
          Edit
        </button>
      </>
    );
  }

  render() {
    const { item, itemId, listId } = this.props;
    let inputGroupClasses = "input-group input-group-lg";
    // inputGroupClasses += item.isComplete ? " fade-out-transition" : "";
    return (
      <div className={inputGroupClasses}>
        {item.isEditing
          ? this.editingFields(item, { itemId, listId })
          : this.viewingFields(item, { itemId, listId })}
      </div>
    );
  }
}

export default ListItem;
