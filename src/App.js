import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

class App extends Component {
  render() {
    return (
      <div className="column">
      <NewTodo />
      <Todo />
      </div>
    );
  }
}

export default App;
