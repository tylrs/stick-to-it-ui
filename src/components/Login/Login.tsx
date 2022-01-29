import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../utils/apiCalls';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const clearInputs = () => {
        setEmail("")
        setPassword("")
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else {
            setPassword(e.target.value)
        }
      }
      
    const submitCredentials = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            await login({email, password})
        } catch (err){
            console.log(err)
        }
    }

    return (
        <section className='login-page-container'>
            <h2>Login</h2>
            <form className='login-box'>
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
                    type="text" 
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