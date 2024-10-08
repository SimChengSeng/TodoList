import React from 'react';
import {Link} from 'react-router-dom';
import '../css/navbar.css';

const navbar = () => {
  return (
    <div className='NavLink'>
        <Link to="/" className='Link'>Home</Link>
        <Link to="/About" className='Link'>About</Link>
        <Link to="/Login" className='Link'>Login</Link>
    </div>
  )
}

export default navbar