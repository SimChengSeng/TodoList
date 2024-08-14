import React, { useState } from 'react';
import Center from '../../components/center';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './login.css';
import center from '../../components/center';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/signup', { username, password });
      
      if (result.data === "exist") {
        alert("User already exists");
      } else if (result.data === "notExist") {
        alert("Successful registration");
        // navigate("/home", { state: { username: result.data.username, _id: result.data._id } });
      }
    } catch (e) {
      alert("Wrong details"); 
      console.log(e);
    }
  }

  return (
    <div className='SignUp'>
      <Center>
        <h2>Sign Up</h2>
        <form onSubmit={submit}>
          <input type="text" onChange={(e) => { setUsername(e.target.value) }} placeholder='username' />
          <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='password' />
          <input type="submit" />
        </form>

        <br />
        <p style={{ textAlign: "center" }}>OR</p>
        <br />
        <Link to="/" style={{ display: "block", textAlign: "center", fontSize: "1.25rem" }}>Login</Link>

      </Center>
    </div>
  )
}

export default SignUp;
