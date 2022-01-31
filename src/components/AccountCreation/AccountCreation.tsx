import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../utils/apiCalls';
import { blankAccount } from '../../utils/miscConstants';
import { AccountType } from '../../utils/types';
import './AccountCreation.css';

const AccountCreation = () => {
    const [accountInfo, setAccountInfo] = useState<AccountType>(blankAccount)

    const clearInputs = () => {
        setAccountInfo(blankAccount)
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountInfo((prevState) => {
            return ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        })
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
            <h2>Create An Account</h2>
            <form className='account-creation-box'>
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="name" 
                    placeholder="name"
                    value={accountInfo.name}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="username" 
                    placeholder="username"
                    value={accountInfo.username}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="text" 
                    name="email" 
                    placeholder="email"
                    value={accountInfo.email}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="password" 
                    name="password" 
                    placeholder="password"
                    value={accountInfo.password}
                    onChange={(e) => handleUserInput(e)}
                />
                <input 
                    required
                    className="account-creation-input"
                    type="password" 
                    name="passwordConfirmation" 
                    placeholder="password confirmation"
                    value={accountInfo.passwordConfirmation}
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