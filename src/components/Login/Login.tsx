import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/apiCalls";
import "./Login.css";
import { UserType } from "../../utils/types";
import { checkLoginCredentials } from "../../utils/miscUtils";

interface LoginProps {
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const clearInputs = () => {
        setEmail("")
        setPassword("")
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        if (e.target.name === "email") {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
      }
      
    const submitCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        try {
            checkLoginCredentials(email, password)
            const user = await login({email, password})
            setUser(user)
            navigate("/all-habits")
        } catch (err:any){
            clearInputs()
            setError("Incorrect Email Or Password, Please Try Again");
        }
    }

    return (
        <section className="login-page-container">
            <form className="login-box" onSubmit={e => submitCredentials(e)}>
                <h2>Login</h2>
                {error && <p className="login-error">{error}</p>}
                <input 
                    required
                    className="login-input"
                    type="email" 
                    name="email" 
                    placeholder="email"
                    maxLength={60}
                    value={email}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="login-input"
                    type="password" 
                    name="password" 
                    placeholder="password"
                    maxLength={20}
                    value={password}
                    onChange={(e) => handleUserInput(e)}
                />
                <button className="submit-login">
                    Login
                </button>
            </form>
        </section>
    )
}

export default Login