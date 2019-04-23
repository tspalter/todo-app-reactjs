import React, {
  Component
} from 'react';
import './NewTodo.css';

class NewTodo extends Component {
  render() {
    return (
      <div className = "todo-form" >
        <form id = "add" onSubmit={this.props.addTodo}>
          <input type = "text" id = "todoInput" placeholder = "What do you need to do?" value={this.props.input} onChange={this.props.onChange}/>
          <button type="submit" id = "add-todo" > Add ToDo! < /button>
        </form>
      </div>
    );
  }
}

export default NewTodo;
