import React, { Component } from "react";
import List from "./List.jsx";

// TODO: write Lists component that implements Grid to layout multiple lists
// single source of truth?
class Lists extends Component {
  state = {
    list: {
      id: 0,
      listItems: [{ id: 0, value: "", isEditing: true, isComplete: false }],
    },
  };

  getCurrentId() {
    let currId = 0;
    this.state.list.listItems.forEach((item) => {
      currId = item.id > currId ? item.id : currId;
    });
    return currId;
  }

  setIsEditing(item, isEditing) {
    const tmp_items = [...this.state.List.ListItems];
    const index = tmp_items.indexOf(item);
    tmp_items[index].isEditing = isEditing;
    this.setState({ list: { listItems: tmp_items } });
  }

  removeItem(itemId) {
    const tmp_items = this.state.list.listItems.filter(
      (item) => item.id !== itemId
    );
    this.setState({ list: { listItems: tmp_items } });
  }

  handleTextInputChange = (item, newTextInput) => {
    const tmp_items = [...this.state.list.listItems];
    const index = tmp_items.indexOf(item);
    tmp_items[index].value = newTextInput;
    this.setState({ list: { listItems: tmp_items } });
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

  handleAddItem = () => {
    const tmp_items = [...this.state.list.listItems];
    console.log(this.getCurrentId());
    tmp_items.push({
      id: this.getCurrentId() + 1,
      value: "",
      isEditing: true,
      isComplete: false,
    });
    this.setState({ list: { listItems: tmp_items } });
  };

  handleComplete = (item, isChecked) => {
    if (isChecked) {
      const tmp_items = [...this.state.list.listItems];
      const index = tmp_items.indexOf(item);
      tmp_items[index].isComplete = true;
      this.setState({ list: { listItems: tmp_items } });
      setTimeout(() => this.removeItem(item.id), 2000);
    }
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <List
              items={this.state.list.listItems}
              onChange={this.handleTextInputChange}
              onDone={this.handleDone}
              onDelete={this.handleDelete}
              onEditing={this.handleEditing}
              onComplete={this.handleComplete}
              onAddItem={this.handleAddItem}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Lists;
