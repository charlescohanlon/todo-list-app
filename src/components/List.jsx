import React, { Component } from "react";
import ListItem from "./ListItem";

class List extends Component {
  render() {
    return (
      <div>
        {this.props.items.map((item) => (
          <ListItem
            key={item.id}
            value={item.value}
            isEditing={item.isEditing}
          />
        ))}
      </div>
    );
  }
}

export default List;
