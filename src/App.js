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
  const [searchItem, setSearchItem] = useState();

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
      ? (!searchItem ? items : items.filter((item) => (item.label.includes(searchItem))))
      : (filterType === "done"
      ? (items.filter((item) => !searchItem ? item.done : item.done && item.label.includes(searchItem)))
      : (items.filter((item) => !searchItem ? !item.done : !item.done && item.label.includes(searchItem))));

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

  const handleSearchItem = (event) => {
    setSearchItem(event.target.value);
  };

  const deleteItem = ({key}) => {
    setItems((prevItems) => 
      prevItems.filter((item) => (item.key !== key))
    );
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
          value={searchItem}
          className="form-control search-input"
          placeholder="type to search"
          onChange={handleSearchItem}
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
                onClick={()=>deleteItem(item)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
            </li>
        ))}
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
