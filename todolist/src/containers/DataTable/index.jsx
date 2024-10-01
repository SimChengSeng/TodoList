import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './dataTable.css';  
import { Link,useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [usersTodos, setUsersTodos] = useState([]);
  const navigate = useNavigate();


  // Fetch all users and todos
  useEffect(() => {
    const fetchUsersTodos = async () => {
      try {
        const result = await axios.get('http://localhost:3001/users-todos');
        
        // Sort users by username before setting state
        const sortedUsers = result.data.sort((a, b) => a.username.localeCompare(b.username));
        setUsersTodos(sortedUsers);

      } catch (error) {
        console.error('Error fetching users and todos:', error);
      }
    };

    fetchUsersTodos();
  }, []);

  // Delete user and update the state
  const handleDeleteUser = async (id) => { 
    try {
      await axios.delete(`http://localhost:3001/deleteUser/${id}`);
      
      // Update the usersTodos state to remove the deleted user
      setUsersTodos(prevUsersTodos => prevUsersTodos.filter(user => user._id !== id));

    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="users-todos">
      <h2>Users and Their Todos</h2>
      <Link to="/" style={{ display: "block", textAlign: "center", fontSize: "1.25rem" }}>Back to Login</Link>
      
      {usersTodos.length === 0 ? (
        <p>No users or todos found.</p>
      ) : (
        usersTodos.map(user => (
          <div key={user._id} className="user-section">
            <h3>User: {user.username}</h3>
            
            {user.todos.length === 0 ? (
              <p>No todos for this user.</p>
            ) : (
              <ul>
                {user.todos.map(todo => (
                  <li key={todo._id}>{todo.task} - {todo.done ? 'Completed' : 'Pending'} -  <span> (Created on: {new Date(todo.createDate).toLocaleString()})</span></li>
                ))}
              </ul>
            )}

            <button type="button" onClick={() => handleDeleteUser(user._id)}>Delete User</button>
          </div>
        ))
      )}

    <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default DataTable;
