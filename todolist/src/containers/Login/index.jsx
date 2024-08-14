import React, { useState } from 'react';
import Center from '../../components/center';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import './login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/login', {username, password });
      
      if (result.data !== "notExist") {
        navigate("/home", { state: { username: result.data.username, _id: result.data._id } });
      } else if (result.data === "notExist") {
        alert("User has not signed up");
      }
    } catch (e) {
      alert("Wrong details");
      console.log(e);
    }
  }

  return (
    <div className='Login'>
      <Center>
        <h2>Login</h2>
        <form onSubmit={submit}>
          <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder='username' required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='password'required />
          <input type="submit" value="Login" />
        </form>

       <p style={{ textAlign: "center" }}>OR</p>
        <br />
        <Link to="/signup" style={{ display: "block", textAlign: "center", fontSize: "1.25rem" }}>Sign Up</Link>
      </Center>
    </div>
  );
}

export default Login;
