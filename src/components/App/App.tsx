import "./App.css";
import React, { useEffect, useState } from "react";
import { UserType } from "../../utils/types";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Login from "../Login/Login";
import AccountCreation from "../AccountCreation/AccountCreation";
import { getCurrentUser } from "../../utils/miscUtils";
import HabitsList from "../HabitsList/HabitsList";
import { emptyUser } from "../../utils/miscConstants";
import HabitForm from "../HabitCreation/HabitCreation";
import HabitCreation from "../HabitCreation/HabitCreation";

const App = () => {
  const [user, setUser] = useState<UserType>(emptyUser);
  const navigate = useNavigate();

  const logOut = async () => {
    localStorage.clear()
    setUser(emptyUser)
    navigate("/login")
  }

  useEffect(() => {
    if (!user.id && localStorage.getItem("currentUser")) {
      setUser(getCurrentUser())
    }
  }, [user])

  return (
    <main>
      <header className="site-header">
        <Link className="site-title" to="/"><h1>Stick To It</h1></Link>
        <div className="link-container">
        <Link className="header-link" to="/">Today</Link>
        <Link className="header-link" to="/all-habits">All Habits</Link>
        <Link className="header-link" to="/">Account</Link>
        {!!user.id && <button className="log-out-button" onClick={() => logOut()}>Log Out</button>}</div>
      </header>
      {!!user.id && <div className="greeting-wrapper"><h3 className="greeting-message">Welcome: {user.name}</h3></div>}
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/all-habits" element={<HabitsList />}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/create-account" element={<AccountCreation />}/>
        <Route path="/create-habit" element={<HabitCreation userId={user.id}/>}/>
      </Routes>
    </main>
  )
}

export default App;
