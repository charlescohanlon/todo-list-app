import React from "react";
import List from "./List";

function Lists(props) {
  const {
    lists,
    onTitleTextChange,
    onDeleteList,
    onItemTextChange,
    onDone,
    onDelete,
    onEdit,
    onComplete,
    onAddItem,
  } = props;
  return (
    <div className="row px-4">
      {lists.map((list) => (
        <div
          className={`col-lg-6 gx-4 ${lists.length === 1 ? "container" : ""}`}
          key={list.listId}
        >
          <List
            listObject={list}
            onTitleTextChange={onTitleTextChange}
            onDeleteList={onDeleteList}
            onItemTextChange={onItemTextChange}
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

export default Lists;
