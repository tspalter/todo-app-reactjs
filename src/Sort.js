import React, {
  Component
} from 'react';
import './Sort.css';

class Sort extends Component {
  render() {
    return (
      <div className = "todo-form" >
        <form id = "sort">
          <div className="radio"
          <input type = "radio" name="sortType" value="date" checked>Sort by Date<br />
          <input type = "radio" name="sortType" value="completed">Sort by Completed <br />
          <button id = "add-todo" > Sort ToDos! < /button>
        </form>
      </div>
    );
  }
}

export default Sort;
