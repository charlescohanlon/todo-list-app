import React, { Component } from "react";
import "./custom_css/ListComponents.css";
import TextareaAutosize from "react-textarea-autosize";

class ListItem extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  getCheckBoxFor(pos, item, onComplete) {
    const viewingCheckBox = (
      <div className="input-group-text btn-group-lg">
        <input
          className="form-check-input m-0 large-checkbox"
          type="checkbox"
          onChange={(change) => onComplete(pos, change.target.checked)}
        />
      </div>
    );
    return item.isEditing ? null : viewingCheckBox;
  }

  getTextAreaFor(pos, item, onItemTextChange, onDone, onEdit) {
    const textAreaClasses = "form-control non-resizable";
    const editingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        autoFocus
        value={item.text}
        ref={(input) => {
          this.textAreaViewing = input;
        }}
        onChange={(evt) => onItemTextChange(pos, evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            onDone(pos);
            this.textAreaViewing.blur();
          }
        }}
      />
    );
    if (item.isEditing) return editingTextArea;
    const viewingTextArea = (
      <TextareaAutosize
        className={`${textAreaClasses + " editing-textfield"}`}
        value={item.text}
        readOnly
        onDoubleClick={() => onEdit(pos)}
        ref={(input) => {
          this.textAreaInput = input;
        }}
      />
    );
    return viewingTextArea;
  }

  getBtnsFor(pos, item, onDone, onDelete, onEdit) {
    const editingButtons = (
      <>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onDelete(pos)}
        >
          Delete
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onDone(pos)}
        >
          Done
        </button>
      </>
    );
    if (item.isEditing) return editingButtons;

    const viewingButtons = (
      <button
        type="button"
        className="btn btn-warning px-4"
        onClick={() => {
          onEdit(pos);
          this.textAreaInput.focus();
        }}
      >
        Edit
      </button>
    );
    return viewingButtons;
  }

  render() {
    const {
      listId,
      itemObject,
      onComplete,
      onItemTextChange,
      onDone,
      onEdit,
      onDelete,
    } = this.props;
    const pos = { itemId: itemObject.itemId, listId };
    return (
      <div
        className={`input-group input-group-lg mb-1 ${
          itemObject.isComplete ? "fade-out" : ""
        }`}
      >
        {itemObject.isComplete ? (
          <input className="form-control show-complete"></input>
        ) : (
          <>
            {this.getCheckBoxFor(pos, itemObject, onComplete)}
            {this.getTextAreaFor(
              pos,
              itemObject,
              onItemTextChange,
              onDone,
              onEdit
            )}
            {this.getBtnsFor(pos, itemObject, onDone, onDelete, onEdit)}
          </>
        )}
      </div>
    );
  }
}

export default ListItem;
