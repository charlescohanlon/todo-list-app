import React, { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  render() {
    const { items, onChange, onDone, onDelete, onEditing, onComplete } =
      this.props;
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
      </div>
    );
  }
}

export default List;
