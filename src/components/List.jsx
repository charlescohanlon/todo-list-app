import React, { Component } from "react";
import ListItem from "./ListItem";
import "./custom_css/ListComponents.css";

class List extends Component {
  getListTitle(listId, titleVal, onTitleTextChange) {
    return (
      <input
        type="text"
        className="form-control non-resizable title-text p-0 mt-3 fs-2"
        placeholder="List Title"
        ref={(input) => {
          this.titleInputArea = input;
        }}
        onChange={(evt) =>
          onTitleTextChange({ itemId: null, listId }, evt.target.value)
        }
        onKeyDown={(evt) => {
          if (evt.key === "Enter") {
            this.titleInputArea.blur();
          }
        }}
        value={titleVal}
      />
    );
  }

  getAddAndDeleteBtnsFor(listId, canAddNewItem, onAddItem, onDeleteList) {
    const btnClasses = "btn btn-lg full-width btn-";
    return (
      <>
        <button
          type="button"
          className={`${btnClasses}primary mb-1`}
          onClick={() => onAddItem(listId)}
          disabled={canAddNewItem}
        >
          Add New Item
        </button>
        <button
          type="button"
          className={`${btnClasses}danger`}
          onClick={() => onDeleteList(listId)}
        >
          Delete List
        </button>
      </>
    );
  }

  render() {
    const {
      listObject,
      onTitleTextChange,
      onItemTextChange,
      onDone,
      onDelete,
      onEdit,
      onComplete,
      onAddItem,
      onDeleteList,
    } = this.props;

    const listItems = listObject.listItems.map((item) => (
      <ListItem
        key={item.itemId}
        itemObject={item}
        listId={listObject.listId}
        onItemTextChange={onItemTextChange}
        onDone={onDone}
        onDelete={onDelete}
        onEdit={onEdit}
        onComplete={onComplete}
      />
    ));

    const { listId, titleVal } = this.props.listObject;
    const canAddNewItem = listObject.listItems.some((item) => item.isEditing);
    return (
      <>
        {this.getListTitle(listId, titleVal, onTitleTextChange)}
        {listItems}
        {this.getAddAndDeleteBtnsFor(
          listId,
          canAddNewItem,
          onAddItem,
          onDeleteList
        )}
      </>
    );
  }
}

export default List;
