import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { actionTypes } from '../../components/reducer';
import './Home.css';

const Search = ({ dispatch, ownerId }) => {
  const [searchTask, setSearchTask] = useState('');

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (searchTask.trim()) {
          const result = await axios.get('http://localhost:3001/search', {
            params: { ownerId, searchTask }
          });
          dispatch({ type: actionTypes.SEARCH_TODO, payload: result.data });
        } else {
          // If searchTask is empty, fetch all todos
          const result = await axios.get('http://localhost:3001/get', {
            params: { ownerId }
          });
          dispatch({ type: actionTypes.SET_TODOS, payload: result.data });
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    };

    handleSearch();
  }, [dispatch, ownerId, searchTask]); // Trigger the effect whenever searchTask changes

  return (
    <>
      <div className='search-form'>
        <input
          type="text"
          placeholder='Search a Task'
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
        />
      </div>
      {/* <div className='showAllBtn'>
        <button type="button" onClick={() => setSearchTask('')}>Show All</button>
      </div> */}
    </>
  );
};

export default Search;