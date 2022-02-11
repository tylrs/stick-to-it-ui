import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, login } from "../../utils/apiCalls";
import { blankAccount } from "../../utils/miscConstants";
import { checkFormSubmission } from "../../utils/miscUtils";
import { AccountType, UserType } from "../../utils/types";
import "./AccountCreation.css";

interface AccountCreationProps {
    setUser: React.Dispatch<React.SetStateAction<UserType>>
}

const AccountCreation: React.FC<AccountCreationProps> = ({ setUser }) => {
    const [accountInfo, setAccountInfo] = useState<AccountType>(blankAccount)
    const [error, setError] = useState<any>("")
    const navigate = useNavigate()

    const clearInputs = () => {
        setAccountInfo(blankAccount)
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setAccountInfo((prevState) => {
            return ({
                ...prevState,
                [e.target.name]: e.target.value
            })
        })
    }
      
    const submitAccountInfo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            checkFormSubmission(accountInfo)
            await createUser(accountInfo)
            const user = await login({email: accountInfo.email, password: accountInfo.password})
            setUser(user)
            navigate("/all-habits")
        } catch (err){
            setError("Please Fill Out All Form Fields")
        }
    }

    return (
        <section className="account-creation-page-container">
            <h2 className="account-page-header">Create An Account</h2>
            {error && <p className="account-creation-error">{error}</p>}
            <form className="account-creation-box" onSubmit={e => submitAccountInfo(e)}>
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
                    type="email" 
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
                    className="submit-account-creation">
                    Create Account
                </button>
            </form>
        </section>
    )
}

export default AccountCreation