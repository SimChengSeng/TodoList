import React, { useState } from 'react';
import axios from 'axios';
import { actionTypes } from '../../components/reducer';
import './Home.css';

const Create = React.memo(({ dispatch, owner }) => {
  const [task, setTask] = useState('');

  console.log("---owner---");
  console.log(owner);

  // Function to handle adding the task
  const handleAdd = async () => {
    if (!task.trim()) {
      console.log('Task is empty');
      return;
    }

    try {
      const result = await axios.post('http://localhost:3001/add', { task, owner });
      dispatch({ type: actionTypes.ADD_TODO, payload: result.data });
      setTask('');  // Clear the input after adding
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // Listen for the Enter key press to add the task
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className='create-form'>
      <input 
        type="text" 
        placeholder='Enter Task' 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        onKeyDown={handleKeyDown}  // Trigger the add on Enter key
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
});

export default Create;
