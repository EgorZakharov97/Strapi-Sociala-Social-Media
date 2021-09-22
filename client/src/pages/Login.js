import React, { useState, Fragment } from "react";
import { setUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

function Login(props) {

    const dispatch = useDispatch();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify({identifier: login, password})
        }

        fetch('/auth/local', params)
            .then(res => res.json())
            .then(handleLoginResult)

    }

    const handleLoginResult = (data) => {
        if(data.statusCode){
            setErrorMessage("Email or password is not correct");
        } else {
            const { user } = data;
            dispatch(setUser(user));
            props.history.push('/');
        }
    }

    return (
        <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                            <div className="card shadow-none border-0 ms-auto me-auto login-card">
                                <div className="card-body rounded-0 text-left">
                                    <h2 className="fw-700 display1-size display2-md-size mb-3">Login into <br />your account</h2>
                                    <form id="login" onSubmit={e => onFormSubmit(e)}>
                                        
                                        <div className="form-group icon-input mb-3">
                                            <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                            <input onChange={(e) => setLogin(e.target.value)} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Email" />                        
                                        </div>
                                        <div className="form-group icon-input mb-1">
                                            <input onChange={(e) => setPassword(e.target.value)} type="Password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" />
                                            <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                        </div>
                                        <div className="form-check text-left mb-3">
                                            {/* <input onChange={(e) => setRememberMe(e.target.value)} type="checkbox" className="form-check-input mt-2" id="exampleCheck5" />
                                            <label className="form-check-label font-xsss text-grey-500">Remember me</label> */}
                                            <a href="/auth/forgot" className="fw-600 font-xsss text-grey-700 mt-1 float-right">Forgot your Password?</a>
                                        </div>
                                        {errorMessage.length > 0 && <p style={{color: 'red'}}>{errorMessage}</p>}
                                    </form>
                                    
                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1"><button type="submit" form="login" className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Login</button></div>
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

export default Login;