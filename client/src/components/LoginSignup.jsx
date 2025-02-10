import React from "react";
import './LoginSignup.css'

import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'

const LoginSignup = () => {
    return (
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="Name" />
                </div>
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="Email" />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="Password" />
                </div>
            </div>

            
        </div>
    )
}

export default LoginSignup

