import React, { Component } from "react";
import ListItem from "./ListItem";
import "./custom_css/List.css";

class List extends Component {
  getAddBtnFor(listId) {
    return (
      <button
        className="btn btn-outline-primary btn-lg full-width"
        onClick={() => this.props.onAddItem(listId)}
      >
        <b>New Todo Item</b>
      </button>
    );
  }

  render() {
    const { items, listId, onChange, onDone, onDelete, onEdit, onComplete } =
      this.props;
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
        {listItems}
        {this.getAddBtnFor(listId)}
      </>
    );
  }
}

export default List;
