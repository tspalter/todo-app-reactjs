import React, {
  Component
} from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div className = "todo-form" >
        <form id = "add" >
          <input type = "text" id = "todoInput" placeholder = "What do you need to do?" />
          <button id = "add-todo" > Add ToDo! < /button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
