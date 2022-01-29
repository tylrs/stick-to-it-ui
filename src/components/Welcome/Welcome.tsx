import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <>
            <h1>Stick To It</h1>
            <section>
                <Link to='/login'/>
                <Link to='/create-account'/>
            </section>
        </>
    )
}

export default Welcome