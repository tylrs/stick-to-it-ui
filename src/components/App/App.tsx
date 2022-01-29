import './App.css';
import React, { useEffect, useState } from 'react';
import { createUser, login } from '../../utils/apiCalls';
import { UserType } from '../../utils/types';
import { Routes, Route, Link } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';
import AccountCreation from '../AccountCreation/AccountCreation';

const App = () => {
  const [user, setUser] = useState<UserType | null>(null)

  // const loginSequence = async () => {
  //   try {
  //     const userData = await login()
  //     setUser(userData)
  //   } catch (err){
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    console.log("hello")
    if (user) console.log("look at the>>>", user)
  }, [user])

  return (
    <main>
      <header>
        <Link className='site-title' to='/'><h1>Stick To It</h1></Link>
      </header>
      <Routes>
        <Route path='/' element={<Welcome />}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/create-account' element={<AccountCreation />}/>
      </Routes>
    </main>
    )
}

export default App;
