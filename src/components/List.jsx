import React, { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  render() {
    const { onChange, onDone, onDelete, onEditing } = this.props;
    return (
      <div>
        {this.props.items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onChange={onChange}
            onDone={onDone}
            onDelete={onDelete}
            onEditing={onEditing}
          />
        ))}
      </div>
    );
  }
}

export default List;
