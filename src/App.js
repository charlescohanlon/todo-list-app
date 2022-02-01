import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Lists from './components/Lists';

class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      lists: [
        {
          title: '',
          listId: 0,
          listItems: [{
            itemId: 0, text: '', isEditing: true, isComplete: false,
          }],
          lastItemId: 0,
        },
      ],
      lastListId: 0,
    };
  }

  // Get a copy of lists from state with a list and item index corresponding to a list and item ID
  getMatchingItemForList(listPos) {
    const { lists } = this.state;
    const { itemId, listId } = listPos;
    const newLists = [...lists];
    const listIndex = newLists.findIndex((list) => list.listId === listId);
    const itemIndex = (itemId !== null)
      ? newLists[listIndex].listItems.findIndex((item) => item.itemId === itemId)
      : null;
    return { newLists, listIndex, itemIndex };
  }

  // Set a list item to editing
  setIsEditing(listPos, isEditing) {
    const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    newLists[listIndex].listItems[itemIndex].isEditing = isEditing;
    this.setState({ lists: newLists });
  }

  // Handle a character input in a list title textbox
  handleTitleTextChange = (listPos, newVal) => {
    const { newLists, listIndex } = this.getMatchingItemForList(listPos);
    newLists[listIndex].title = newVal;
    this.setState({ lists: newLists });
  };

  // Handle a character input in a list item textbox
  handleTextInputChange = (listPos, value) => {
    const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    newLists[listIndex].listItems[itemIndex].text = value;
    this.setState({ lists: newLists });
  };

  // Set a list item to not editing when done butten pressed
  handleDone = (listPos) => {
    this.setIsEditing(listPos, false);
  };

  // Delete a list item from a list
  handleDelete = (listPos) => {
    this.removeItem(listPos);
  };

  // Set a list item to editing when edit button pressed
  handleEdit = (listPos) => {
    this.setIsEditing(listPos, true);
  };

  // Add a new list item to list
  handleAddItem = (listId) => {
    const { newLists, listIndex } = this.getMatchingItemForList({ listId, itemId: null });
    newLists[listIndex].listItems.push({
      itemId: newLists[listIndex].lastItemId += 1,
      text: '',
      isEditing: true,
      isComplete: false,
    });
    this.setState({ lists: newLists });
  };

  // Remove a list item from a list when checked
  handleComplete = (listPos, isChecked) => {
    if (isChecked) {
      const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
      newLists[listIndex].listItems[itemIndex].isComplete = isChecked;
      this.setState({ newLists });
      setTimeout(() => this.removeItem(listPos), 250);
    }
  };

  // Add new list
  handleAddList = () => {
    const newState = { ...this.state };
    newState.lists.push({
      title: '',
      listId: newState.lastListId += 1,
      listItems: [{
        itemId: 0, text: '', textHeight: 1, isEditing: true, isComplete: false,
      }],
      canAddNewItem: false,
      lastItemId: 0,
    });
    this.setState(newState);
  };

  // Remove specific list
  handleDeleteList = (listId) => {
    const newState = { ...this.state };
    const { newLists, listIndex } = this.getMatchingItemForList({ listId, itemId: null });
    newLists.splice(listIndex, 1);
    newState.lists = newLists;
    this.setState(newState);
  };

  // Remove specific list item from list
  removeItem(listPos) {
    const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    const list = newLists[listIndex].listItems;
    list.splice(itemIndex, 1);
    this.setState({ newLists });
  }

  render() {
    const { lists } = this.state;
    return (
      <div>
        <NavBar onAddList={this.handleAddList} />
        <Lists
          lists={lists}
          onTitleTextChange={this.handleTitleTextChange}
          onDeleteList={this.handleDeleteList}
          onItemTextChange={this.handleTextInputChange}
          onDone={this.handleDone}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          onComplete={this.handleComplete}
          onAddItem={this.handleAddItem}
        />
      </div>
    );
  }
}

export default TodoApp;
