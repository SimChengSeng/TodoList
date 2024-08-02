import React from 'react';
import Center from '../../components/center';
import UseCase from './UseCase.jpeg';
import './About.css';


function About() {

  return (
    <div>
          <h2>About</h2>
          <img src={UseCase} className='useCase'/>
    </div>
  )
}

export default About;