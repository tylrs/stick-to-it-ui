import './App.css';
import React, { useEffect, useState } from 'react';
import { UserType } from '../../utils/types';
import { Routes, Route, Link } from 'react-router-dom';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';
import AccountCreation from '../AccountCreation/AccountCreation';
import { getCurrentUser } from '../../utils/miscUtils';
import HabitsList from '../HabitsList/HabitsList';

const App = () => {
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    if (user) console.log("look at the>>>", user)
    if (!user) setUser(getCurrentUser())
  }, [user])

  return (
    <main>
      <header className='site-header'>
        <Link className='site-title' to='/'><h1>Stick To It</h1></Link>
        {user && <h3 className='greeting-message'>Welcome: {user.name}</h3>}
        {user && <button className="logout">Log Out</button>}
      </header>
      <Routes>
        <Route path='/' element={<Welcome />}/>
        <Route path='/all-habits' element={<HabitsList />}/>
        <Route path='/login' element={<Login setUser={setUser}/>}/>
        <Route path='/create-account' element={<AccountCreation />}/>
      </Routes>
    </main>
    )
}

export default App;
