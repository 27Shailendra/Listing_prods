import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('/api/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = () => {
    axios.post('/api/todos', { text, completed: false }).then(res => {
      setTodos([...todos, res.data]);
      setText('');
    });
  };

  const toggleTodo = (id, completed) => {
    axios.put(`/api/todos/${id}`, { completed: !completed }).then(res => {
      setTodos(todos.map(t => t._id === id ? res.data : t));
    });
  };

  const deleteTodo = id => {
    axios.delete(`/api/todos/${id}`).then(() => {
      setTodos(todos.filter(t => t._id !== id));
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>TODO App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span
              onClick={() => toggleTodo(todo._id, todo.completed)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={{ marginLeft: 8 }}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
