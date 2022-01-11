import React, { Component } from 'react';
import './custom_css/ListItem.css';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';

class ListItem extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.item = props.item;
  }

  getCheckBoxFor(pos, onComplete) {
    const viewingCheckBox = (
      <div className="input-group-text btn-group-lg">
        <input
          className="form-check-input m-0 large-checkbox"
          type="checkbox"
          onChange={(change) => onComplete(pos, change.target.checked)}
        />
      </div>
    );
    return this.item.isEditing ? null : viewingCheckBox;
  }

  getTextAreaFor(pos, onItemTextChange, onDone, onEdit) {
    const { text, isEditing, isComplete } = this.item;
    let textAreaClasses = 'form-control non-resizable';
    if (isComplete) textAreaClasses += ' show-complete';

    const editingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        value={text}
        onChange={(evt) => onItemTextChange(pos, evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') onDone(pos);
        }}
      />
    );
    if (isEditing) return editingTextArea;

    const viewingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        value={text}
        readOnly
        onDoubleClick={() => onEdit(pos)}
        ref={(input) => { this.textInputArea = input; }}
      />
    );
    return viewingTextArea;
  }

  getBtnsFor(pos, onDone, onDelete, onEdit) {
    const { isEditing } = this.item;
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
    if (isEditing) return editingButtons;

    const viewingButtons = (
      <button
        type="button"
        className="btn btn-warning px-4"
        onClick={() => {
          onEdit(pos);
          this.textInputArea.focus();
        }}
      >
        Edit
      </button>
    );
    return viewingButtons;
  }

  render() {
    const {
      listId, onComplete, onItemTextChange, onDone, onEdit, onDelete,
    } = this.props;
    const pos = { itemId: this.item.itemId, listId };
    const { isComplete } = this.item;
    return (
      <div className={`input-group input-group-lg mb-1 ${isComplete ? 'fade-out' : ''}`}>
        {this.getCheckBoxFor(pos, onComplete)}
        {this.getTextAreaFor(pos, onItemTextChange, onDone, onEdit)}
        {this.getBtnsFor(pos, onDone, onDelete, onEdit)}
      </div>
    );
  }
}

ListItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
  listId: PropTypes.number.isRequired,
  onItemTextChange: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ListItem;
