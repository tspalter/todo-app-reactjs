import React, { Component } from 'react';
import './Todo.css';

var apiKey = "cf5ecc59e4e6a82460e2d3ebf3812a494c937e1c7f727248b1aab1e4261c73f6";

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completed: this.props.completed
    }
    // Dont forget this line for every event handler!
    this.completeTodo = this.completeTodo.bind(this);
  }
  render() {
    var className = "";
    if (this.state.completed) {
      className = "checked";
    }
    return (
      <li id={this.props.id} className={className}>
        <p onClick={this.completeTodo}>{this.props.text}</p>
        <span className="close" onClick={this.props.removeDeletedTodo}>X</span>
      </li>
    );
  }
  completeTodo(event) {
    var todoId = event.target.parentNode.id;
    console.log(event);
    event.preventDefault();
    var data = {
      completed: true
    }
    var self = this;
    var completeRequest = new XMLHttpRequest();
    completeRequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        self.setState({completed: true});
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    };
    var address = "https://api.kraigh.net/todos/" + todoId;
    completeRequest.open("PUT", address, true);
    completeRequest.setRequestHeader("Content-type", "application/json");
    completeRequest.setRequestHeader("x-api-key", apiKey);
    completeRequest.send(JSON.stringify(data));
  }
}

export default Todo;
