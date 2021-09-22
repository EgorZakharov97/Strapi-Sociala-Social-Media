import React, { useState, Fragment } from "react";
import { setUser } from '../features/user/userSlice';
import { resetPassword } from '../functions/request';

function ForgotPassword(props) {

    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState([]);

    const onResetPassword = async (e) => {
        e.preventDefault();
        
        const res = await fetch('/auth/forgot-password', {method: 'POST', email, url:`${process.env.REACT_APP_DOMAIN}/new-password`}).then(res => res.json());
        
        if(res.message) {
            const messages = res.message[0].messages.map(message => message.message);
            setMessages(messages)
        }
    }

    return (
        <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                            <div className="card shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">
                                    <h2 className="fw-700 display1-size display2-md-size mb-3">Reset Password</h2>
                                    <form id="login" onSubmit={e => onResetPassword(e)}>
                                        
                                        <div className="form-group icon-input mb-3">
                                            <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Email" />                        
                                        </div>

                                        {messages.length > 0 && <p style={{color: 'red'}}>{messages}</p>}
                                    </form>
                                    
                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1"><button type="submit" form="login" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Reset</button></div>
                                        <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Dont have account <a href="/auth/register" className="fw-700 ms-1">Register</a></h6>
                                    </div>
                                    {/* <div className="col-sm-12 p-0 text-center mt-2">
                                        
                                        <h6 className="mb-0 d-inline-block bg-white fw-500 font-xsss text-grey-500 mb-3">Or, Sign in with your social account </h6>
                                        <div className="form-group mb-1"><a href="/register" className="form-control text-left style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2"><img src="assets/images/icon-1.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Google</a></div>
                                        <div className="form-group mb-1"><a href="/register" className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "><img src="assets/images/icon-3.png" alt="icon" className="ms-2 w40 mb-1 me-5" /> Sign in with Facebook</a></div>
                                    </div> */}
                                </div>
                            </div> 
                        </div>
    );
}

export default ForgotPassword;