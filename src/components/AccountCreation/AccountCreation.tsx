import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, login } from "../../utils/apiCalls";
import { blankAccount } from "../../utils/miscConstants";
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
            await createUser(accountInfo)
            const user = await login({email: accountInfo.email, password: accountInfo.password})
            setUser(user)
            navigate("/all-habits")
        } catch (err:any){
            if (err.errors) {
                setError(err.errors)
            } else {
                setError(err)
            }
        }
    }

    return (
        <section className="account-creation-page-container">
            {error && <p className="account-creation-error">{error}</p>}
            <form className="account-creation-box" onSubmit={e => submitAccountInfo(e)}>
                <h2 className="account-page-header">Create An Account</h2>
                <label htmlFor="account-name-input">Account Name:</label>
                <input 
                    required
                    id="account-name-input"
                    className="account-creation-input"
                    type="text" 
                    name="name" 
                    placeholder="name"
                    maxLength={60}
                    value={accountInfo.name}
                    onChange={(e) => handleUserInput(e)}
                />
                <label htmlFor="account-username-input">Username:</label>
                <input 
                    required
                    id="account-username-input"
                    className="account-creation-input"
                    type="text" 
                    name="username" 
                    placeholder="username"
                    maxLength={20}
                    value={accountInfo.username}
                    onChange={(e) => handleUserInput(e)}
                />
                <label htmlFor="account-email-input">Email:</label>
                <input 
                    required
                    id="account-email-input"
                    className="account-creation-input"
                    type="email" 
                    name="email" 
                    placeholder="email"
                    maxLength={40}
                    value={accountInfo.email}
                    onChange={(e) => handleUserInput(e)}
                />
                <label htmlFor="account-password-input">Password:</label>
                <input 
                    required
                    id="account-password-input"
                    className="account-creation-input"
                    type="password" 
                    name="password" 
                    placeholder="password"
                    maxLength={50}
                    value={accountInfo.password}
                    onChange={(e) => handleUserInput(e)}
                />
                <label htmlFor="account-password-confirmation-input">Password Confirmation:</label>
                <input 
                    required
                    id="account-password-confirmation-input"
                    className="account-creation-input"
                    type="password" 
                    name="passwordConfirmation" 
                    placeholder="password confirmation"
                    maxLength={50}
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