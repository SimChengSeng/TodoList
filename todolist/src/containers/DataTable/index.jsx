import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dataTable.css';  
import { Link } from 'react-router-dom';

const DataTable = () => {
  const [usersTodos, setUsersTodos] = useState([]);

  useEffect(() => {
    const fetchUsersTodos = async () => {
      try {
        const result = await axios.get('http://localhost:3001/users-todos');
        setUsersTodos(result.data);
      } catch (error) {
        console.error('Error fetching users and todos:', error);
      }
    };

    fetchUsersTodos();
  }, []);

  return (
    <div className="users-todos">
      <h2>Users and Their Todos</h2>
      <Link to="/" style={{ display: "block", textAlign: "center", fontSize: "1.25rem" }}>Back to home</Link>
      
      
      {usersTodos.length === 0 ? (
        <p>No users or todos found.</p>
      ) : (
        usersTodos.map(user => (
          <div key={user._id} className="user-section">
            <h3>{user.username}</h3>
            {user.todos.length === 0 ? (
              <p>No todos for this user.</p>
            ) : (
              <ul>
                {user.todos.map(todo => (
                  <li key={todo._id}>{todo.task} - {todo.done ? 'Completed' : 'Pending'}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DataTable;
