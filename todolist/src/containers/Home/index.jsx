import React, { useReducer } from 'react';
import Create from './Create';
import List from './List';
import Center from '../../components/center';
import './Home.css';
import { reducer, initialState, actionTypes } from '../../components/reducer';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <Center>
        <h2>Todo List</h2>
        <Create dispatch={dispatch} />
        <List todos={state.todos} dispatch={dispatch} />
      </Center>
    </div>
  );
};

export default Home;
