import './App.css';
import React, { useEffect, useState } from 'react';
import { createUser, login } from '../../utils/apiCalls';

const App = () => {
  const [message, setMessage] = useState('')

  const getMessage = async () => {
    try {
      const response = await fetch('https://stick-to-it-api.herokuapp.com/')
      const data = await response.json()
      setMessage(data.message)
    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    // getMessage()
    // createUser()
    login()
  })

  return (
    <>
      <h1>{message}</h1>
      <p>Hello</p>
    </>
  );
}

export default App;
