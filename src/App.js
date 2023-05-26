import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((item) => item.id === editId);
      const updateTodo = todos.map((item) =>
        item.id === editTodo.id
          ? (item = { id: item.id, todo })
          : { id: item.id, todo: item.todo }
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
      return ;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
    console.log(todos);
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((item) => item.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <>
      <div className="app">
        <div className="container">
          <h1>Todo List App</h1>
          <form className="todoForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add to list..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit">{editId ? "Edit" : "Add"}</button>
          </form>

          <ul className="allTodo">
            {todos.map((item) => (
              <li key={item.id}>
                <span className="singleTodo">{item.todo}</span>
                <button onClick={() => handleEdit(item.id)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
