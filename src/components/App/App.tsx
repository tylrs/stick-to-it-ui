import './App.css';
import React, { useEffect, useState } from 'react';
import { createUser, login } from '../../utils/apiCalls';
import { UserType } from '../../utils/types';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';

const App = () => {
  const [user, setUser] = useState<UserType | null>(null)

  const loginSequence = async () => {
    try {
      const userData = await login()
      setUser(userData)
    } catch (err){
      console.log(err)
    }
  }

  useEffect(() => {
    console.log("hello")
  }, [])

  return (
    <main>
      <header><h1>Stick To It</h1></header>
      <Routes>
        <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
    </main>
    )
}

export default App;
