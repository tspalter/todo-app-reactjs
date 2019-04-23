import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  render() {
    return (
      <li>
        <p>{this.props.text}</p>
        <span className="close">X</span>
      </li>
    );
  }
}

export default Todo;
