import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../utils/apiCalls';
import './AccountCreation.css';

const AccountCreation = () => {
    const [accountInfo, setAccountInfo] = useState({
        name: "", 
        username: "", 
        email: "", 
        password: "", 
        passwordConfirmation: ""
    })

    const clearInputs = () => {
        setAccountInfo({
            name: "", 
            username: "", 
            email: "", 
            password: "", 
            passwordConfirmation: ""
        })
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }
      
    const submitAccountInfo = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try {
            await createUser(accountInfo)
        } catch (err){
            console.log(err)
        }
    }

    return (
        <section className='account-creation-page-container'>
            <form className='account-creation-box'>
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="name" 
                    placeholder="name"
                    value={}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="username" 
                    placeholder="username"
                    value={}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="email" 
                    placeholder="email"
                    value={}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="password" 
                    placeholder="password"
                    value={}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="passwordConfirmation" 
                    placeholder="password confirmation"
                    value={}
                    onChange={(e) => handleUserInput(e)}
                />
                <button 
                    className="submit-account-creation"
                    onClick={e => submitAccountInfo(e)}>
                    Create Account
                </button>
            </form>
        </section>
    )
}

export default AccountCreation