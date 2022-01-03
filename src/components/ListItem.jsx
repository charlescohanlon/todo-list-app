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
      <div className="input-group-text">
        <input
          className="form-check-input mt-0"
          type="checkbox"
          onChange={(change) => onComplete(pos, change.target.checked)}
        />
      </div>
    );
    return this.item.isEditing ? null : viewingCheckBox;
  }

  getTextAreaFor(pos, onChange, onDone, onEdit) {
    let textAreaClasses = 'form-control non-resizable';
    if (this.item.isComplete) textAreaClasses += ' show-complete';
    const editingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        value={this.item.text}
        onChange={(evt) => onChange(pos, evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') onDone(pos);
        }}
        autoFocus
      />
    );
    const viewingTextArea = (
      <TextareaAutosize
        className={textAreaClasses}
        value={this.item.text}
        readOnly
        onDoubleClick={() => onEdit(pos)}
      />
    );
    return this.item.isEditing ? editingTextArea : viewingTextArea;
  }

  getBtnsFor(pos, onDone, onDelete, onEdit) {
    const editingButtons = (
      <>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onDone(pos)}
        >
          Done
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(pos)}
        >
          Delete
        </button>
      </>
    );
    const viewingButtons = (
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => onEdit(pos)}
      >
        Edit
      </button>
    );
    return this.item.isEditing ? editingButtons : viewingButtons;
  }

  render() {
    const {
      listId, onComplete, onChange, onDone, onEdit, onDelete,
    } = this.props;
    const pos = { itemId: this.item.itemId, listId };
    let inputGroupClasses = 'input-group input-group-lg pt-1';
    if (this.item.isComplete) inputGroupClasses += ' fade-out-transition';
    return (
      <div className={inputGroupClasses}>
        {this.getCheckBoxFor(pos, onComplete)}
        {this.getTextAreaFor(pos, onChange, onDone, onEdit)}
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
  onChange: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ListItem;
