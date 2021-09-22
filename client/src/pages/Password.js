import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import Appfooter from '../components/Appfooter';
import { Link } from 'react-router-dom';
import { resetPassword } from '../functions/request';
import { useSelector } from 'react-redux';

function Password(props) {

    const user = useSelector(state => state.user.data.payload);

    const reset = () => {
        resetPassword(user.email)
    }

    return <>
        <Header/>
        <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        
            <div className="middle-sidebar-bottom">
                <div className="middle-sidebar-left">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                <Link to="/settings" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Reset Password</h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 text-center">
                                        <figure className="avatar ms-auto me-auto mb-0 mt-2 w100"></figure>
                                        <h2 className="fw-700 font-sm text-grey-900 mt-3">Reset Password</h2>
                                        <div className="col-lg-12">
                                            <button onClick={reset} type="submit" className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>            
        </div>
        <Appfooter/>
    </>
}

export default Password;