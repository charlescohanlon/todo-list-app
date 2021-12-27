import React, { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  render() {
    const {
      items,
      onChange,
      onDone,
      onDelete,
      onEditing,
      onComplete,
      onAddItem,
    } = this.props;
    return (
      <div>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onChange={onChange}
            onDone={onDone}
            onDelete={onDelete}
            onEditing={onEditing}
            onComplete={onComplete}
          />
        ))}
        <button
          className="btn btn-outline-primary btn-lg container"
          onClick={onAddItem}
        >
          <b>+</b>
        </button>
      </div>
    );
  }
}

export default List;
