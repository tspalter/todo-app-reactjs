import React, {
  Component
} from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';
import Header from './Header';

var apiKey = "cf5ecc59e4e6a82460e2d3ebf3812a494c937e1c7f727248b1aab1e4261c73f6";

class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      input: ''
    }
    // Dont forget this line for every event handler!
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
    this.sortTodos = this.sortTodos.bind(this);
  }

  addTodo(event) {
    // read the input value from state
    const newTodoText = this.state.input;
    // Do AJAX
    console.log(event);
    event.preventDefault();
    var data = {
      "text": newTodoText
    }
    var self = this;
    //Initialize AJAX
    var createRequest = new XMLHttpRequest();
    //Response Handler
    createRequest.onreadystatechange = function() {
      //wait for readyState = 4 & 200 response
      if (this.readyState === 4 && this.status === 200) {
        //parse JSON
        self.setState({
          todos: [...self.state.todos, JSON.parse(this.responseText)]
        })
        // clear the input field
        self.setState({input: ''});
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    };
    createRequest.open("POST", "https://api.kraigh.net/todos", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apiKey);
    createRequest.send(JSON.stringify(data));
  }

  onChange(event) {
  // Set the state to the value of the input
    this.setState({
      input: event.target.value
    });
  }

  removeDeletedTodo(event) {
    var todoId = event.target.parentNode.id;
    console.log(todoId);
    var self = this;
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log("Bye!");
        const remainingTodos = self.state.todos.filter((todo) => {
          // Looping through all todos, if the id of the current todo DOES NOT equal the id of the todo we want to delete, keep it
          if (todo.id !== todoId) {
            return todo;
          }
        });
        self.setState({todos: remainingTodos});
      } else if (this.readyState === 4) {
        console.log(this.responseText);
      }
    };
    var address = "https://api.kraigh.net/todos/" + todoId;
    deleteRequest.open("DELETE", address, true);
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();
  }

  sortTodos(event) {
    console.log("Sorting");
    var todos = this.state.todos;
    todos.sort(function (a, b) {
      return a.text.localeCompare(b.text);
    });
    this.setState({todos: todos});
  }

  render() {
    return (
      <div className = "column" id = "center">
      <Header />
      <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />
      <button id="sort-todo" onClick={this.sortTodos}>Sort!</button>
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
