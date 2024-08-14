import React, { useState } from 'react';
import axios from 'axios';
import { actionTypes } from '../../components/reducer';
import './Home.css';

const Search = ({ dispatch, ownerId }) => {
  const [searchTask, setSearchTask] = useState('');
 
  const handleSearch = async () => {
    if (!searchTask.trim()) {
      console.log('Task is empty');
      return;
    }

    try {
      const result = await axios.get('http://localhost:3001/search', {params: { ownerId, searchTask}});
        dispatch({ type: actionTypes.SEARCH_TODO, payload: result.data });
        setSearchTask('');
        console.log(result);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAll = async () => {
    try {
      const result = await axios.get('http://localhost:3001/get', {
        params: { ownerId }
      });
      dispatch({ type: actionTypes.SET_TODOS, payload: result.data });
    } catch (error) {
      console.error('Error fetching all todos:', error);
    }
  };

  return (
<>
    <div className='search-form'>
      <input type="text" placeholder='Search a Task' value={searchTask} onChange={(e) => setSearchTask(e.target.value)} />
      <button type="button" onClick={handleSearch}>Search</button>
    </div>
    <div className='showAllBtn'>
         <button type="button" onClick={handleShowAll}>Show All</button>
    </div>

</> 
  );
  
}

export default Search