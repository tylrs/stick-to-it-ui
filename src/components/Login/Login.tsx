import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/apiCalls";
import "./Login.css";
import { UserType } from "../../utils/types";

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const clearInputs = () => {
        setEmail("")
        setPassword("")
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
      }
      
    const submitCredentials = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            const user = await login({email, password})
            setUser(user)
            navigate("/all-habits")
        } catch (err){
            console.log(err)
        }
    }

    return (
        <section className="login-page-container">
            <form className="login-box">
                <h2>Login</h2>
                <input 
                    required
                    className="login-input"
                    type="text" 
                    name="email" 
                    placeholder="email"
                    value={email}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="login-input"
                    type="password" 
                    name="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => handleUserInput(e)}
                />
                <button 
                    className="submit-login"
                    onClick={e => submitCredentials(e)}>
                    Login
                </button>
            </form>
        </section>
    )
}

export default Login