import React, { Component } from "react";
import './App.css';
import List from "./components/List.jsx";

class App extends Component {
  state = {
    lists: [
      { listId: 0, listItems: [{ itemId: 0, value: "", isEditing: true, isComplete: false }] }
    ]
  };

  // could make this more efficient by checking at the index equivalent to the id before searching
  getMatchingItemForList(listPos) {
    const { itemId, listId } = listPos;
    const lists = [...this.state.lists];
    const listIndex = lists.findIndex(list => list.listId === listId);
    const itemIndex = (itemId !== null) ? lists[listIndex].listItems.findIndex(item => item.itemId === itemId) : null;
    return { lists, listIndex, itemIndex };
  }

  setIsEditing(listPos, isEditing) {
    const { lists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    lists[listIndex].listItems[itemIndex].isEditing = isEditing;
    this.setState({ lists });
  }

  removeItem(listPos) {
    const { lists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    let list = lists[listIndex].listItems;
    console.log("deleting: ", itemIndex);
    list.splice(itemIndex, 1);
    for (let i = 0; i < list.length; i++) {
      list[i].itemId = i;
    }
    console.log(lists);
    this.setState({ lists });
  }

  handleTextInputChange = (listPos, newTextInput) => {
    const { lists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    lists[listIndex].listItems[itemIndex].value = newTextInput;
    this.setState({ lists });
  };

  handleDone = (listPos) => {
    this.setIsEditing(listPos, false);
  };

  handleDelete = (listPos) => {
    this.removeItem(listPos);
  };

  handleEdit = (listPos) => {
    this.setIsEditing(listPos, true);
  };

  handleAddItem = (listId) => {
    const listPos = { listId, itemId: null };
    const { lists, listIndex } = this.getMatchingItemForList(listPos);
    const nextIndex = lists[listIndex].listItems.length;
    lists[listIndex].listItems.push({
      itemId: nextIndex,
      value: "",
      isEditing: true,
      isComplete: false,
    });
    this.setState({ lists });
  };

  handleComplete = (listPos, isChecked) => {
    if (isChecked) {
      const { lists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
      lists[listIndex].listItems[itemIndex].isComplete = isChecked;
      this.setState({ lists });
      this.removeItem(listPos)
      // setTimeout(() => this.removeItem(listPos), 2000);
    }
  };

  render() {
    return (
      <div className="row">
        {this.state.lists.map((list) => (
          <div className="container col-3 gx-0" key={list.listId}>
            <List
              listId={list.listId}
              items={list.listItems}
              onChange={this.handleTextInputChange}
              onDone={this.handleDone}
              onDelete={this.handleDelete}
              onEdit={this.handleEdit}
              onComplete={this.handleComplete}
              onAddItem={this.handleAddItem} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;