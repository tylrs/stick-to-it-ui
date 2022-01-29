import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
    return (
        <>
            <section className='welcome-page-container'>
                 <button className='account-link-wrapper'>
                     <Link className='account-link' to='/login'>Login</Link>
                 </button>
                 <button className='account-link-wrapper'>
                     <Link className='account-link' to='/create-account'>Create Account</Link>
                 </button>
            </section>
        </>
    )
}

export default Welcome