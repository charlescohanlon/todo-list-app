import React, { Component } from "react";
import './App.css';
import List from "./components/List.jsx";

class App extends Component {
  state = {
    List: {
      ListItems: [
        { id: 0, value: "", isEditing: true, isComplete: false },
        { id: 1, value: "", isEditing: true, isComplete: false },
        { id: 2, value: "", isEditing: true, isComplete: false },
        { id: 3, value: "", isEditing: true, isComplete: false },
        { id: 4, value: "", isEditing: false, isComplete: false },
      ],
    }
  };

  setIsEditing(item, isEditing) {
    const tmp_items = [...this.state.List.ListItems];
    const index = tmp_items.indexOf(item);
    tmp_items[index].isEditing = isEditing;
    this.setState({ List: { ListItems: tmp_items } });
  }

  removeItem(itemId) {
    const tmp_items = this.state.List.ListItems.filter(
      (item) => item.id !== itemId
    );
    this.setState({ List: { ListItems: tmp_items } })
  }

  handleTextInputChange = (item, newTextInput) => {
    const tmp_items = [...this.state.List.ListItems];
    const index = tmp_items.indexOf(item);
    tmp_items[index].value = newTextInput;
    this.setState({ List: { ListItems: tmp_items } });
  };

  handleDone = (item) => {
    this.setIsEditing(item, false);
  };

  handleDelete = (id) => {
    this.removeItem(id);
  };

  handleEditing = (item) => {
    this.setIsEditing(item, true);
  };

  handleComplete = (item, isChecked) => {
    if (isChecked) {
      const tmp_items = [...this.state.List.ListItems];
      const index = tmp_items.indexOf(item);
      tmp_items[index].isComplete = true;
      setTimeout(() => this.setState({ List: { ListItems: tmp_items } }), 1000);
      setTimeout(() => this.removeItem(item.id), 3000);
    }
  };

  render() {
    return (
      <List
        items={this.state.List.ListItems}
        onChange={this.handleTextInputChange}
        onDone={this.handleDone}
        onDelete={this.handleDelete}
        onEditing={this.handleEditing}
        onComplete={this.handleComplete}
      />
    );
  }
}

export default App;
