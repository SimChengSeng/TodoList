import { useState, useEffect } from 'react';
import axios from 'axios';

const useTodos = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, fetchTodos };
};

export default useTodos;
