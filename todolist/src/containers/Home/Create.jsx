import React, { useState } from 'react'
import './Home.css'
import axios from 'axios'

function Create({ fetchTodos }) {
  const[task,setTask] = useState('')
  
  const handleAdd = () =>{
    if(!task.trim()){
      console.log('Task is empty')
      return
    }

    axios.post('http://localhost:3001/add',{task:task})
    .then(result => {
      setTask('')
      fetchTodos()
    })
    .catch(err => console.log(err))
  }

  return (  
    <div className='create-form'>
        <input type="text" placeholder='Enter Task' onChange={(e) => setTask(e.target.value)}
        />
        <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create