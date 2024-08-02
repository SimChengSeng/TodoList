import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';
import { BiBorderAll } from 'react-icons/bi';

function List() {
    
    const[todos,setTodos] = useState([]);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/get')
          .then(result => setTodos(result.data))
          .catch(err => console.log(err));
      };
    
      useEffect(() => {
        fetchTodos();
      }, []);

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {
            console.log(result);
            fetchTodos(); 
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            console.log(result);
            fetchTodos(); 
        })
        .catch(err => console.log(err));
    }

    const todosNotDone = todos.filter(todo => !todo.done);
    const todosDone = todos.filter(todo => todo.done);

  return (  
    <div className='list'>
       {
          todos.length === 0
          ?
          <div><h2 style={{border: "1px solid black", padding:"10px", margin:"auto"}}>No Record!</h2></div>
          :
          (
            <>
                {todosNotDone.map(todo => (
                    <div key={todo._id} className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            <BsCircleFill className='icon' />
                            <p>{todo.task}</p>
                        </div>
                        <div>
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
        )
        }
    </div>
  )
}

export default List;