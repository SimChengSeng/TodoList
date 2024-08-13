import React, { useReducer } from 'react';
import Create from './Create';
import List from './List';
import Center from '../../components/center';
import './Home.css';
import { reducer, initialState, actionTypes } from '../../components/reducer';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  const navigate = useNavigate();

console.log(location.state.username);
console.log("---state.username---");

console.log(location.state._id);
console.log("---state._id---");


  const logout = () => {
    localStorage.clear();
    navigate('/');  
  };

  return (
    <div>
      <Center>
        <h2>Todo List</h2>
        <h3>Welcome, {location.state.username}</h3>
        <Create dispatch={dispatch} owner={location.state._id} />
        <List todos={state.todos} dispatch={dispatch} ownerId={location.state._id}/>
      </Center>
      <div>
        <a href="#" onClick={logout} style={{display:"flow-root",marginTop:"400px",textAlign: "center", fontSize: "1.25rem",color:"black" }}>LOGOUT</a>
      </div>
    </div>
  );
};

export default Home;
