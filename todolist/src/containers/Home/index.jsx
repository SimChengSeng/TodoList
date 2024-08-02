import React, {useState} from 'react';
import Create from './Create';
import List from './List';
import useTodos from '../../components/useTodos';
import Center from '../../components/center';
import './Home.css';

function Home() {
  
  const { todos, fetchTodos } = useTodos();

  return (
    <div>
       <Center>
          <h2>Todo List</h2>
          <Create fetchTodos={fetchTodos}/>
          <List todos={todos} fetchTodos={fetchTodos}/>
        </Center>
    </div>
  )
}

export default Home;