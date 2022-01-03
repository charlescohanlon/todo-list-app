/* 
 * TODO: add list titles, add list delete, look into JSON.stringify to "save" todos, 
 * refactor react code, add comment documentation, make responsive 
*/
import React, { Component } from "react";
import './App.css';
import List from "./components/List.jsx";


class App extends Component {
  state = {
    lists: [
      {
        title: "",
        listId: 0,
        listItems: [{ itemId: 0, text: "", isEditing: true, isComplete: false }],
        lastItemId: 0
      }
    ],
    lastListId: 0
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
    list.splice(itemIndex, 1);
    this.setState({ lists });
  }

  handleTextInputChange = (listPos, value) => {
    const { lists, listIndex, itemIndex } = this.getMatchingItemForList(listPos);
    lists[listIndex].listItems[itemIndex].text = value;
    this.setState({ lists });
  };

  handleDone = (listPos) => {
    this.setIsEditing(listPos, false);
  };

  handleDelete = (listPos) => {
    this.removeItem(listPos);
  };

  handleEdit = (listPos,) => {
    this.setIsEditing(listPos, true);
  };

  handleAddItem = (listId) => {
    const { lists, listIndex } = this.getMatchingItemForList({ listId, itemId: null });
    lists[listIndex].listItems.push({
      itemId: ++lists[listIndex].lastItemId,
      text: "",
      textHeight: 1,
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
      setTimeout(() => this.removeItem(listPos), 250);
    }
  };

  handleAddList = () => {
    const newState = { ...this.state };
    newState.lists.push({
      title: "",
      listId: ++newState.lastListId,
      listItems: [{ itemId: 0, text: "", textHeight: 1, isEditing: true, isComplete: false }],
      lastItemId: 0
    });
    this.setState(newState);
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-dark">
          <div className="container-fluid px-4">
            <h1 className="text-white">Todo List App</h1>
            <button className="btn btn-lg btn-outline-primary d-flex" onClick={this.handleAddList}><b>New List</b></button>
          </div>
        </nav>
        <div className="row px-4">
          {this.state.lists.map((list) => (
            <div className="container col gx-4" key={list.listId}>
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
      </>
    );
  }
}

export default App;