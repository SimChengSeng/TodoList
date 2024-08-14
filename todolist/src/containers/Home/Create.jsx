import React, { useState } from 'react';
import axios from 'axios';
import { actionTypes } from '../../components/reducer';
import './Home.css';

const Create = ({ dispatch, owner }) => {
  const [task, setTask] = useState('');

  console.log("---owner---");
  console.log(owner);


  const handleAdd = async () => {
    if (!task.trim()) {
      console.log('Task is empty');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3001/add', { task,owner});
      dispatch({ type: actionTypes.ADD_TODO, payload: result.data });
      setTask('');
      console.log(result);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create-form'>
      <input type="text" placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Create;
