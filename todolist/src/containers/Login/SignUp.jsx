import React, { useState } from 'react';
import Center from '../../components/center';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/signup', { username, password });
      if (result.data === "exist") {
        alert("User already exists");
      } else if (result.data === "notExist") {
        history("/home", { state: { id: username } });
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
        <p>OR</p>
        <br />

        <Link to="/">Login</Link>
      </Center>
    </div>
  )
}

export default SignUp;
