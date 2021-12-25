import React, { Component } from "react";
import './App.css';
import List from "./components/List.jsx";

class App extends Component {
  state = {
    List: {
      ListItems: [
        { id: 0, value: "", isEditing: true },
        { id: 1, value: "", isEditing: true },
        { id: 2, value: "", isEditing: true },
        { id: 3, value: "", isEditing: true },
        { id: 4, value: "", isEditing: true },
      ],
    }
  };

  setIsEditing(item, isEditing) {
    const tmp_items = [...this.state.List.ListItems];
    const index = tmp_items.indexOf(item);
    tmp_items[index].isEditing = isEditing;
    this.setState({ List: { ListItems: tmp_items } });
  }

  handleTextInputChange = (item, newTextInput) => {
    const tmp_items = [...this.state.List.ListItems];
    const index = tmp_items.indexOf(item);
    tmp_items[index].value = newTextInput;
    this.setState({ List: { ListItems: tmp_items } });
  }

  handleDone = (item) => {
    this.setIsEditing(item, false);
  }

  handleDelete = (id) => {
    const tmp_items = this.state.List.ListItems.filter(
      (item) => item.id !== id
    );
    this.setState({ List: { ListItems: tmp_items } })
  }

  handleEditing = (item) => {
    this.setIsEditing(item, true);
  }


  render() {
    return (
      <List
        items={this.state.List.ListItems}
        onChange={this.handleTextInputChange}
        onDone={this.handleDone}
        onDelete={this.handleDelete}
        onEditing={this.handleEditing}
      />
    );
  }
}

export default App;
