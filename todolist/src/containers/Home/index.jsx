import React, { useReducer } from 'react';
import Create from './Create';
import List from './List';
import Center from '../../components/center';
import './Home.css';
import { reducer, initialState, actionTypes } from '../../components/reducer';
import {useLocation, useNavigate} from 'react-router-dom';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation()

  return (
    <div>
      <Center>
        <h2>Todo List</h2>
        <h3>{location.state.id}</h3>
        <Create dispatch={dispatch} />
        <List todos={state.todos} dispatch={dispatch} />
      </Center>
    </div>
  );
};

export default Home;
