import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
// import ListTitle from './ListTitle';
import './custom_css/List.css';

class List extends Component {
  getAddBtnFor(listId, onAddItem) {
    return (
      <button
        type="button"
        className="btn btn-outline-primary btn-lg full-width"
        onClick={() => onAddItem(listId)}
        disabled={!this.canAddNewItem()}
      >
        <b>New Todo Item</b>
      </button>
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
      items, listId, onChange, onDone, onDelete, onEdit, onComplete, onAddItem,
    } = this.props;
    const listItems = items.map((item) => (
      <ListItem
        key={item.itemId}
        listId={listId}
        item={item}
        onChange={onChange}
        onDone={onDone}
        onDelete={onDelete}
        onEdit={onEdit}
        onComplete={onComplete}
      />
    ));
    return (
      <>
        {/* <ListTitle /> */}
        {listItems}
        {this.getAddBtnFor(listId, onAddItem)}
      </>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    itemId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isComplete: PropTypes.bool.isRequired,
  })).isRequired,
  listId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default List;
