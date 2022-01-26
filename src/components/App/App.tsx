import './App.css';
import React, { useEffect, useState } from 'react';

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
    getMessage()
  })

  return (
    <h1>{message}</h1>
  );
}

export default App;
