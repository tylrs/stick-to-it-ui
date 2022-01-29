import './App.css';
import React, { useEffect, useState } from 'react';
import { createUser, login } from '../../utils/apiCalls';
import { UserType } from '../../utils/types';

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
      <>
        <h1>Something</h1>
        <p>Hello</p>
      </>
    )
}

export default App;
