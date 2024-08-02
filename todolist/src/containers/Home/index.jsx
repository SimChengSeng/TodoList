import React, {useState} from 'react';
import Create from './Create';
import List from './List';
import Center from '../../components/center';
import './Home.css';

function Home() {

  return (
    <div>
       <Center>
          <h2>Todo List</h2>
          <Create/>
          <List/>
        </Center>
    </div>
  )
}

export default Home;