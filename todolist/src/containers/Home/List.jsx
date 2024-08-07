import React, { useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill,BsPencilSquare } from 'react-icons/bs';
import { actionTypes } from '../../components/reducer';
import './Home.css';

const List = ({ todos, dispatch }) => {
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get('http://localhost:3001/get');
        dispatch({ type: actionTypes.SET_TODOS, payload: result.data });
      } catch (error) {
        console.error(error);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleEdit = async (id) => {
    try {
      const result = await axios.put(`http://localhost:3001/update/${id}`);
      dispatch({ type: actionTypes.EDIT_TODO, payload: result.data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateText = async (id) => {
    try {
      const todo = todos.find(todo => todo._id === id);
      const newTask = prompt('Enter the new task:', todo.task);
      if (newTask && newTask.trim()) {
        const result = await axios.put(`http://localhost:3001/updateTodo/${id}`, { task: newTask });
        dispatch({ type: actionTypes.EDIT_TODO, payload: result.data });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => { 
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      dispatch({ type: actionTypes.DELETE_TODO, payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const todosNotDone = todos.filter(todo => !todo.done);
  const todosDone = todos.filter(todo => todo.done);

  return (
    <div className='list'>
      {todos.length === 0 ? (
        <div>
          <h2 style={{ border: "2px solid black", padding: "10px", margin: "auto" }}>No Record!</h2>
          <p style={{ fontFamily: "system-ui", textAlign: "center", padding: "10px", margin: "auto" }}>No need to wait, Add tasks now!</p>
        </div>
      ) : (
        <>
          {todosNotDone.map(todo => (
            <div key={todo._id} className='task'>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                <BsCircleFill className='icon' />
                <p>{todo.task}</p>
              </div>
              <div>
              <span><BsPencilSquare className='icon' onClick={() => handleUpdateText(todo._id)} /></span>
                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
              </div>
            </div>
          ))}
          {todosDone.map(todo => (
            <div key={todo._id} className='task'>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                <BsFillCheckCircleFill className='icon' />
                <p className="line_through">{todo.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default List;
