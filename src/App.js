import "./App.css";
import {useState} from "react";
import {v4 as myNewId} from "uuid";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

function App() {
  const [itemToDo, setItemToDo] = useState();
  const [items, setItems] = useState([
    {
      key: myNewId(),
      label: "Have Fun"
    }, 
    {
      key: myNewId(),
      label: "Spread Empathy"
    }, 
    {
      key: myNewId(),
      label: "Generate Value"
    }
  ]);

  const [filterType, setFilterType] = useState("all");

  const handleToDoChange = (event) => {
    setItemToDo(event.target.value);
  };

  const handleAddItem = () => {
    const newItem = { key: myNewId(), label: itemToDo };
    setItems((prevItem) => [newItem, ...prevItem]);
    setItemToDo("");
  };

  const handleItemDone = ({key}) => {
    setItems((prevItems) => 
      prevItems.map((item) => {
        if (item.key === key) {
          return {...item, done: !item.done};
        } else {
          return item;
        }
      })
    );
  };

  const moreToDo = items.filter((item) => !item.done).length;
  const doneToDo = items.length - moreToDo;

  const handleFilterChange = ({ type }) => {
    setFilterType(type);
  };

  const filteredArray =
      filterType === "all"
      ? items
      : filterType === "done"
      ? items.filter((item) => item.done)
      : items.filter((item) => !item.done);

  const makeImportant = ({key}) => {
      setItems((prevItems) => 
      prevItems.map((item) => {
        if (item.key === key) {
          return {...item, important: !item.important};
        } else {
          return item;
        }
      })
    );
  }

  const deleteItem = () => {
    // smth
  }

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>{moreToDo} more to do, {doneToDo} done</h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {/* Button group */}
          {buttons.map((item) => (
            <button key={item.type} type="button" className={`btn btn-${
              filterType !== item.type ? "outline-" : ""
              }info`} onClick={()=>handleFilterChange(item)}>
              {item.label}
            </button>
          ))}
          
          {/* <button type="button" className="btn btn-info">
            All
          </button>
          <button type="button" className="btn btn-info btn-outline-secondary">
            Active
          </button>
          <button type="button" className="btn btn-info btn-outline-secondary">
            Done
          </button> */}
        </div>
      </div>

      {/* List-group */}
      <ul className="list-group todo-list">
        {/* simple item */}
        {filteredArray.length > 0 && 
          filteredArray.map((item) => (
            <li key={item.key} className="list-group-item">
            <span className={`todo-list-item ${item.done?"done":""}`}>
              <span className={`todo-list-item-label ${item.important ? "important" : ""}`} onClick={()=>handleItemDone(item)}>{item.label}</span>
              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
                onClick={()=>makeImportant(item)}
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={deleteItem}
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
            </li>
        ))}

        {/* Important item */}
        {/* <li className="list-group-item">
          <span className="todo-list-item important">
            <span className="todo-list-item-label">Important Item</span>

            <button
              type="button"
              className="btn btn-outline-success btn-sm float-right"
            >
              <i className="fa fa-exclamation" />
            </button>

            <button
              type="button"
              className="btn btn-outline-danger btn-sm float-right"
            >
              <i className="fa fa-trash-o" />
            </button>
          </span>
        </li> */}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={itemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange={handleToDoChange}
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>Add item</button>
      </div>
    </div>
  );
}

export default App;
