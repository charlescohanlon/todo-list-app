import React, { Component } from "react";
import ListItem from "./ListItem";
import "./List.css";

class List extends Component {
  render() {
    const {
      items,
      listId,
      onChange,
      onDone,
      onDelete,
      onEdit,
      onComplete,
      onAddItem,
    } = this.props;
    // console.log("canAddNewItem: ", canAddNewItem);
    return (
      <div>
        {items.map((item) => (
          <ListItem
            key={item.itemId}
            itemId={item.itemId}
            listId={listId}
            item={item}
            onChange={onChange}
            onDone={onDone}
            onDelete={onDelete}
            onEdit={onEdit}
            onComplete={onComplete}
          />
        ))}
        <button
          className="btn btn-outline-primary btn-lg full-width"
          onClick={() => onAddItem(listId)}
        >
          <b>New Todo Item</b>
        </button>
      </div>
    );
  }
}

export default List;
