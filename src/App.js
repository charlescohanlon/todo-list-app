/*
 * TODO: add list titles, add list delete, look into JSON.stringify to "save" todos
 * add comment documentation, make responsive
*/
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

  // could make this more efficient by checking at the index equivalent to the id before searching
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

  setIsEditing(listPos, isEditing) {
    const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    newLists[listIndex].listItems[itemIndex].isEditing = isEditing;
    this.setState({ lists: newLists });
  }

  handleTextInputChange = (listPos, value) => {
    const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    newLists[listIndex].listItems[itemIndex].text = value;
    this.setState({ lists: newLists });
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
    const { newLists, listIndex } = this.getMatchingItemForList({ listId, itemId: null });
    newLists[listIndex].listItems.push({
      itemId: newLists[listIndex].lastItemId += 1,
      text: '',
      textHeight: 1,
      isEditing: true,
      isComplete: false,
    });
    this.setState({ lists: newLists });
  };

  handleComplete = (listPos, isChecked) => {
    if (isChecked) {
      const { newLists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
      newLists[listIndex].listItems[itemIndex].isComplete = isChecked;
      this.setState({ newLists });
      setTimeout(() => this.removeItem(listPos), 250);
    }
  };

  handleAddList = () => {
    const newState = { ...this.state };
    newState.lists.push({
      title: '',
      listId: newState.lastListId += 1,
      listItems: [{
        itemId: 0, text: '', textHeight: 1, isEditing: true, isComplete: false,
      }],
      lastItemId: 0,
    });
    this.setState(newState);
  };

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
          onChange={this.handleTextInputChange}
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
