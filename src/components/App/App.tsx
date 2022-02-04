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
import HabitCreation from "../HabitCreation/HabitCreation";
import Header from "../Header/Header";

const App = () => {
  const [user, setUser] = useState<UserType>(emptyUser);
  const navigate = useNavigate();

  const logOut = () => {
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
      {!!user.id 
        ? <Header headerType={"loggedIn"} logOut={logOut}/>
        : <Header headerType={"loggedOut"} logOut={logOut}/> 
      }
      {!!user.id && <div className="greeting-wrapper"><h3 className="greeting-message">Welcome: {user.name}</h3></div>}
      {!user.id 
        ? <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/login" element={<Login setUser={setUser}/>}/>
            <Route path="/create-account" element={<AccountCreation setUser={setUser}/>}/>
            <Route path="*" element={<Welcome />}/>
          </Routes>
        : <Routes>
            <Route path="/" element={<HabitsList userId={user.id}/>}/>
            <Route path="/all-habits" element={<HabitsList userId={user.id}/>}/>
            <Route path="/create-habit" element={<HabitCreation userId={user.id}/>}/>
            <Route path="*" element={<HabitsList userId={user.id}/>}/>
          </Routes>
      }
    </main>
  )
}

export default App;
