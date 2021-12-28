import React, { Component } from "react";
import './App.css';
import List from "./components/List.jsx";

class App extends Component {
  state = {
    lists: [{
      listItems: [{ value: "", isEditing: true, isComplete: false }]
    }]
  };

  getMatchingItemForList(listIndex, itemIndex) {
    const lists = [...this.state.lists];
    const item = this.state.lists[listIndex].listItems[itemIndex];
    return { lists, item };
  }

  setIsEditing(listIndex, itemIndex, isEditing) {
    const { lists, item } = this.getMatchingItemForList(listIndex, itemIndex);
    item.isEditing = isEditing;
    lists[listIndex].listItems[itemIndex] = item;
    this.setState({ lists });
  }

  // TODO: fix something wrong with the listItem indices
  removeItem(listIndex, itemIndex) {
    const lists = [...this.state.lists];
    lists[listIndex].listItems.splice(0, 1);
    console.log(lists);
    this.setState({ lists });
  }

  handleTextInputChange = (listIndex, itemIndex, newTextInput) => {
    const { lists, item } = this.getMatchingItemForList(listIndex, itemIndex);
    item.value = newTextInput;
    lists[listIndex].listItems[itemIndex] = item;
    this.setState({ lists });
  };

  handleDone = (listIndex, itemIndex) => {
    this.setIsEditing(listIndex, itemIndex, false);
  };

  handleDelete = (listIndex, itemIndex) => {
    this.removeItem(listIndex, itemIndex);
  };

  handleEdit = (listIndex, itemIndex) => {
    this.setIsEditing(listIndex, itemIndex, true);
  };

  handleAddItem = (listIndex) => {
    const lists = [...this.state.lists];
    const nextIndex = lists[listIndex].listItems.length;
    lists[listIndex].listItems.push({
      id: nextIndex,
      value: "",
      isEditing: true,
      isComplete: false,
    });
    this.setState({ lists });
  };

  handleComplete = (listIndex, itemIndex, isChecked) => {
    if (isChecked) {
      const { lists, item } = this.getMatchingItemForList(listIndex, itemIndex);
      item.isChecked = isChecked;
      lists[listIndex].listItems[itemIndex] = item;
      this.setState({ lists });
      setTimeout(() => this.removeItem(listIndex, itemIndex), 2000);
    }
  };

  render() {
    const { lists } = this.state;
    return (
      <div>
        {this.state.lists.map((list) => (
          <List key={lists.indexOf(list)}
            listIndex={lists.indexOf(list)}
            items={list.listItems}
            onChange={this.handleTextInputChange}
            onDone={this.handleDone}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            onComplete={this.handleComplete}
            onAddItem={this.handleAddItem} />
        ))}
      </div>
    );
  }
}

export default App;