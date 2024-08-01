import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import {BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

function List() {
    
    const[todos,setTodos] = useState([])

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
        .catch(err => console.log(err))
    }

  return (  
    <div className='list'>
       {
          todos.length === 0
          ?
          <div><h2>No Record!</h2></div>
          :
          todos.map(todo => (
            <div className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                    {todo.done ? 
                    <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                    :<BsCircleFill className='icon'/>
                    }
                    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                    <span><BsFillTrashFill className='icon' 
                        onClick={() => handleDelete(todo._id)}/></span>
                </div>
            </div>
          ))
        }
    </div>
  )
}

export default List