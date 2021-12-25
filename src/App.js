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



  render() {
    return (
      <List items={this.state.List.ListItems} />
    );
  }
}

export default App;
