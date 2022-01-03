import React, { Component } from "react";
import "./custom_css/ListItem.css";
import TextareaAutosize from "react-textarea-autosize";

class ListItem extends Component {
  getCheckBoxFor(item, pos) {
    const viewingCheckBox = (
      <div className="input-group-text">
        <input
          className="form-check-input mt-0"
          type="checkbox"
          onChange={(change) =>
            this.props.onComplete(pos, change.target.checked)
          }
        />
      </div>
    );
    return item.isEditing ? <></> : viewingCheckBox;
  }

  getTextAreaFor(item, pos) {
    let textAreaClasses = "form-control non-resizable";
    if (item.isComplete) textAreaClasses += " show-complete";
    const editingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        value={item.text}
        onChange={(evt) => this.props.onChange(pos, evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") this.props.onDone(pos);
        }}
        autoFocus
      />
    );
    const viewingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        value={item.text}
        readOnly={true}
        onDoubleClick={() => this.props.onEdit(pos)}
      />
    );
    return item.isEditing ? editingTextArea : viewingTextArea;
  }

  getBtnsFor(item, pos) {
    let buttonClasses = "btn btn-";
    const editingButtons = (
      <>
        <button
          className={buttonClasses + "primary"}
          onClick={() => this.props.onDone(pos)}
        >
          Done
        </button>
        <button
          className={buttonClasses + "danger"}
          onClick={() => this.props.onDelete(pos)}
        >
          Delete
        </button>
      </>
    );
    const viewingButtons = (
      <button
        className={buttonClasses + "warning"}
        onClick={() => this.props.onEdit(pos)}
      >
        Edit
      </button>
    );
    return item.isEditing ? editingButtons : viewingButtons;
  }

  render() {
    const { item, listId } = this.props;
    const pos = { itemId: item.itemId, listId };
    let inputGroupClasses = "input-group input-group-lg pt-1";
    if (item.isComplete) inputGroupClasses += " fade-out-transition";
    return (
      <div className={inputGroupClasses}>
        {this.getCheckBoxFor(item, pos)}
        {this.getTextAreaFor(item, pos)}
        {this.getBtnsFor(item, pos)}
      </div>
    );
  }
}

export default ListItem;
