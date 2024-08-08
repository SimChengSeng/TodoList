import React, { useState } from 'react';
import Center from '../../components/center';
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });
      if (result.data === "exist") {
        navigate("/home", { state: { id: email } });
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
          <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='xxxx@gmail.com' required />
          <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='$$$$' required />
          <input type="submit" value="Login" />
        </form>

        <br />
        <p>OR</p>
        <br />

        <Link to="/signup">Signup Page</Link>
      </Center>
    </div>
  );
}

export default Login;
