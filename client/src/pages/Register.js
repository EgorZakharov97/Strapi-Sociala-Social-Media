import React, { useState , Fragment } from "react";

function Register(props) {

    const [username, setUserName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPasswprd, setComfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleError = (message) => {
        setErrorMessages(message)
        setShowError(true);
    }

    const register = () => {
        if(!terms) return handleError(["You must agree terms of service in order to continue"]);
        if(password !== confirmPasswprd) return handleError(["Passwords does not match"]);

        const payload = {
            username,
            display_name: displayName,
            email,
            password
        }

        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(payload)
        }

        fetch('/auth/local/register', params)
            .then(res => res.json())
            .then(handleRegistrationResult)
    }

    const handleRegistrationResult = async (res) => {
        if(res.message) {
            const messages = await res.message[0].messages.map(msg => {
                return msg.message
            })
    
            handleError(messages)
        }
        else {
            props.history.push('/login')
        }
    }

    return (
        <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                        <div className="card shadow-none border-0 ms-auto me-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">Create <br />your account</h2>                        
                                <form>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                        <input onChange={e => setUserName(e.target.value)} value={username} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Username" />                        
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-user text-grey-500 pe-0"></i>
                                        <input onChange={e => setDisplayName(e.target.value)} value={displayName} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Display Name" />                        
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input onChange={e => setEmail(e.target.value)} value={email} type="text" className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600" placeholder="Your Email Address" />                        
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <input onChange={e => setPassword(e.target.value)} value={password} type="Password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Password" />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input onChange={e => setComfirmPassword(e.target.value)} value={confirmPasswprd} type="Password" className="style2-input ps-5 form-control text-grey-900 font-xss ls-3" placeholder="Confirm Password" />
                                        <i className="font-sm ti-lock text-grey-500 pe-0"></i>
                                    </div>
                                    <div className="form-check text-left mb-3">
                                        <input onChange={e => setTerms(e.target.value)} value={terms} type="checkbox" className="form-check-input mt-2" id="exampleCheck2" />
                                        <label className="form-check-label font-xsss text-grey-500">Accept Term and Conditions</label>
                                        
                                    </div>
                                </form>
                                
                                <div className="col-sm-12 p-0 text-left">
                                    {showError && errorMessages.map((error, i) => {
                                        return <p key={i} style={{color:"red"}}>{error}</p>
                                    })}
                                    <div className="form-group mb-1"><button onClick={register} className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 ">Register</button></div>
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">Already have account <a href="/auth/login" className="fw-700 ms-1">Login</a></h6>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
    );
}

export default Register;