'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('loggedIn') !== 'true') router.push('/login');
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`);
    setTodos(res.data);
  }

  async function addTodo() {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/todos`, { title });
    setTitle('');
    fetchTodos();
  }

  async function toggleDone(todo) {
    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${todo.id}`, { ...todo, done: !todo.done });
    fetchTodos();
  }

  async function deleteTodo(id) {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/todos/${id}`);
    fetchTodos();
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>To-Do List</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleDone(todo)}
              style={{ textDecoration: todo.done ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
