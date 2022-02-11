import "./App.css";
import React, { useEffect, useState } from "react";
import { UserType } from "../../utils/types";
import { Routes, Route, useNavigate } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
import Login from "../Login/Login";
import AccountCreation from "../AccountCreation/AccountCreation";
import { getCurrentUser } from "../../utils/miscUtils";
import HabitsList from "../HabitsList/HabitsList";
import { emptyUser } from "../../utils/miscConstants";
import HabitCreation from "../HabitCreation/HabitCreation";
import Header from "../Header/Header";
import Message from "../Message/Message";

const App = () => {
  const [user, setUser] = useState<UserType>(emptyUser);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear()
    setUser(emptyUser)
    navigate("/login")
  }

  useEffect(() => {
    if (message) {
      setTimeout(()=>{
        setMessage("")
      }, 2000)
    }
  })

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
      <Message message={message}/>
      {!!user.id && <div className="greeting-wrapper"><h3 className="greeting-message">Welcome: {user.name}</h3></div>}
      {!user.id 
        ? <Routes>
            <Route path="/" element={<Welcome />}/>
            <Route path="/login" element={<Login setUser={setUser}/>}/>
            <Route path="/create-account" element={<AccountCreation setUser={setUser}/>}/>
            <Route path="*" element={<Welcome />}/>
          </Routes>
        : <Routes>
            <Route path="/" element={<HabitsList userId={user.id} type={"all"} setMessage={setMessage}/>}/>
            <Route path="/all-habits" element={<HabitsList userId={user.id} type={"all"} setMessage={setMessage}/>}/>
            <Route path="/today" element={<HabitsList userId={user.id} type={"today"} setMessage={setMessage}/>}/>
            <Route path="/create-habit" element={<HabitCreation userId={user.id}/>}/>
            <Route path="*" element={<HabitsList userId={user.id} type={"all"} setMessage={setMessage}/>}/>
          </Routes>
      }
    </main>
  )
}

export default App;
