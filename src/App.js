import React, {
  Component
} from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
import Header from './Header';

var apiKey = "cf5ecc59e4e6a82460e2d3ebf3812a494c937e1c7f727248b1aab1e4261c73f6";

class App extends Component {
  addTodo(event) {
    // read the input value from state
    const newTodoText = this.state.input;
    // Do AJAX
    console.log(event);
    event.preventDefault();
    var data = {
      "text": newTodoText.value
    }
    //Initialize AJAX
    var createRequest = new XMLHttpRequest();
    //Response Handler
    createRequest.onreadystatechange = function() {
      //wait for readyState = 4 & 200 response
      if (this.readyState == 4 && this.status == 200) {
        //parse JSON
        var todo = JSON.parse(this.responseText);
      } else if (this.readyState == 4) {
        console.log(this.responseText);
      }
    };
    createRequest.open("POST", "https://api.kraigh.net/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apiKey);
    createRequest.send(JSON.stringify(data));
    // Inside your AJAX success
    this.state.input = '';
  }
  onChange(event) {
  // Set the state to the value of the input
    this.setState({
      input: event.target.value
    });
  }
  constructor() {
    super()
    this.state = {
  todos: [],
  input: ''
}
  }
  render() {
    return (
      <div className = "column" id = "center">
      <Header />
      <NewTodo newTodo={this.newTodo} onSubmit={this.onChange} input={this.state.input} />
      <ul id="todo-list">

      {this.state.todos.map((todo) =>
        <Todo key={todo.id} id={todo.id} completed={todo.completed}
        text={todo.text} removeDeletedTodo={this.removeDeletedTodo}/>
      )}
      </ul>
      </div>
    );
  }
    componentDidMount() {
      const self = this;
      var listRequest = new XMLHttpRequest();

      listRequest.onreadystatechange = function() {
          if (listRequest.readyState === 4 && listRequest.status === 200) {
              var todos = JSON.parse(listRequest.responseText);
              //display ToDos on page
              self.setState({todos: todos});
          } else if (this.readyState === 4) {
            console.log(this.responseText);
          }
      };

      listRequest.open("GET", "https://api.kraigh.net/todos", true);
      listRequest.setRequestHeader("x-api-key", apiKey);
      listRequest.send();
     // If AJAX successful, parse the JSON and save to state
  }
}

export default App;
