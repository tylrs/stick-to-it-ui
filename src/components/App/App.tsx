import './App.css';
import React, { useEffect, useState } from 'react';

const App = () => {

  const getMessage = async () => {
    try {
      const message = await fetch('https://localhost:3000/')
      console.log(message)
    } catch (err){
      console.log(err)
    }
  }

  return (
    <h1>Blank</h1>
  );
}

export default App;
