import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import './custom_css/List.css';

class List extends Component {
  getListTitle(listId, titleVal, onTitleTextChange) {
    return (
      <input
        type="text"
        className="form-control non-resizable title-text p-0 mt-2 fs-2"
        placeholder="List Title"
        ref={(input) => { this.titleInputArea = input; }}
        onChange={(evt) => onTitleTextChange({ itemId: null, listId }, evt.target.value)}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            this.titleInputArea.blur();
          }
        }}
        value={titleVal}
      />
    );
  }

  getAddAndDeleteBtnFor(listId, onAddItem, onDeleteList) {
    const btnClasses = 'btn btn-lg full-width btn-';
    return (
      <>
        <button
          type="button"
          className={`${btnClasses}primary mb-1`}
          onClick={() => onAddItem(listId)}
          disabled={!this.canAddNewItem()}
        >
          <b>New Todo Item</b>
        </button>
        <button
          type="button"
          className={`${btnClasses}danger`}
          onClick={() => onDeleteList(listId)}
        >
          <b>Delete List</b>
        </button>
      </>
    );
  }

  canAddNewItem() {
    const { items } = this.props;
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].isEditing) return false;
    }
    return true;
  }

  render() {
    const {
      titleVal,
      items,
      listId,
      onTitleTextChange,
      onItemTextChange,
      onDone,
      onDelete,
      onEdit,
      onComplete,
      onAddItem,
      onDeleteList,
    } = this.props;

    const listItems = items.map((item) => (
      <ListItem
        key={item.itemId}
        listId={listId}
        item={item}
        onItemTextChange={onItemTextChange}
        onDone={onDone}
        onDelete={onDelete}
        onEdit={onEdit}
        onComplete={onComplete}
      />
    ));
    return (
      <>
        {this.getListTitle(listId, titleVal, onTitleTextChange)}
        {listItems}
        {this.getAddAndDeleteBtnFor(listId, onAddItem, onDeleteList)}
      </>
    );
  }
}

List.propTypes = {
  titleVal: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
  })).isRequired,
  listId: PropTypes.number.isRequired,
  onTitleTextChange: PropTypes.func.isRequired,
  onItemTextChange: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
  onDeleteList: PropTypes.func.isRequired,
};

export default List;
