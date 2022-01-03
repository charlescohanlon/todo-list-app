import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

function Lists(props) {
  const {
    lists, onChange, onDone, onDelete, onEdit, onComplete, onAddItem,
  } = props;
  return (
    <div className="row px-4">
      {lists.map((list) => (
        <div className="container col gx-4" key={list.listId}>
          <List
            listId={list.listId}
            items={list.listItems}
            onChange={onChange}
            onDone={onDone}
            onDelete={onDelete}
            onEdit={onEdit}
            onComplete={onComplete}
            onAddItem={onAddItem}
          />
        </div>
      ))}
    </div>
  );
}
Lists.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    listId: PropTypes.number.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.shape({
      itemId: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isEditing: PropTypes.bool.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })),
    lastItemId: PropTypes.number.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
};

export default Lists;
