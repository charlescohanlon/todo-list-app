import React, { Component } from "react";
import ListItem from "./ListItem";
import "./List.css";

class List extends Component {
  render() {
    const {
      items,
      listIndex,
      onChange,
      onDone,
      onDelete,
      onEdit,
      onComplete,
      onAddItem,
    } = this.props;
    return (
      <div>
        {items.map((item) => (
          <ListItem
            key={items.indexOf(item)}
            item={item}
            itemIndex={items.indexOf(item)}
            listIndex={listIndex}
            onChange={onChange}
            onDone={onDone}
            onDelete={onDelete}
            onEdit={onEdit}
            onComplete={onComplete}
          />
        ))}
        <button
          className="btn btn-outline-primary btn-lg full-width"
          onClick={() => onAddItem(listIndex)}
        >
          <b>+</b>
        </button>
      </div>
    );
  }
}

export default List;
