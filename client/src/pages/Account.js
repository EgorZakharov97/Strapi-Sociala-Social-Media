import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../features/user/userSlice";

import Header from '../components/Header';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

function Account(props) {

    const user = useSelector(state => state.user.data.payload)
    const formRef = useRef();
    const dispatch = useDispatch();

    const [username, setUsername] = useState(user.username);
    const [display_name, setDisplay_name] = useState(user.display_name);
    const [about, setAbout] = useState(user.about || "");
    const [email, setEmail] = useState(user.email);

    const [avater, setAvater] = useState("");
    const [background, setBackground] = useState("");

    const [messages, setMessages] = useState([]);

    const submit = (e) => {
        e.preventDefault();

        const formElement = formRef.current;
        const request = new XMLHttpRequest();
        const formData = new FormData();
        const formElements = formElement.elements;
        const data = {};

        for (let i = 0; i < formElements.length; i++) {
            const currentElement = formElements[i];
            if (!['submit', 'file'].includes(currentElement.type)) {
              data[currentElement.name] = currentElement.value;
            } else if (currentElement.type === 'file') {
              for (let i = 0; i < currentElement.files.length; i++) {
                const file = currentElement.files[i];
                formData.append(`files.${currentElement.name}`, file, file.name);
              }
            }
          }

        formData.append('data', JSON.stringify(data));
        request.open('PUT', `/users/${user.id}`);

        request.onreadystatechange = function() { 
            if (this.readyState == 4) {
                const updated = JSON.parse(this.response)
                onUserUpdated(updated)
            } 
          };

        request.send(formData);
    }

    const onUserUpdated = async (res) => {
        console.log(res)
        if(res.message) {
            const errors = await res.message[0].messages.map(each => each.message);
            setMessages(errors);
        }
        else {
            dispatch(setUser(res))
            setMessages(["Changes saved"])
        }
    }

    return (
        <Fragment> 
            <Header />

            <div className="main-content bg-lightblue theme-dark-bg right-chat-active">
        
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="middle-wrap">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                                    <Link to="/settings" className="d-inline-block mt-2"><i className="ti-arrow-left font-sm text-white"></i></Link>
                                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">Account Details</h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 text-center">
                                        <figure className="avatar ms-auto me-auto mb-0 mt-2 w100"><img src={user.avater ? user.avater.url : "/assets/images/profile.png"} alt="avater" className="shadow-sm rounded-3 w-100" /></figure>
                                        <h2 className="fw-700 font-sm text-grey-900 mt-3">{user.display_name}</h2>
                                        <h4 className="text-grey-500 fw-500 mb-3 font-xsss mb-4">{user.username}</h4>    
                                        
                                    </div>
                                </div>

                                <form ref={formRef} action="#">
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss mb-2">Display Name</label>
                                                <input name="display_name" onChange={e => setDisplay_name(e.target.value)} value={display_name} type="text" className="form-control" />
                                            </div>        
                                        </div>

                                    <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss mb-2">Username</label>
                                                <input name="username" onChange={e => setUsername(e.target.value)} value={username} type="text" className="form-control" />
                                            </div>        
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss mb-2">Email</label>
                                                <input name="email" onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" />
                                            </div>        
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="mont-font fw-600 font-xsss mb-2 text-dark">Description</label>
                                        <textarea name="about" onChange={e => setAbout(e.target.value)} className="form-control mb-0 p-3 h100 bg-greylight lh-16" rows="5" placeholder="Write your message..." >{about}</textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss mb-2 text-dark">Profile Image</label>
                                            <div className="card mt-3 border-0">
                                                <div className="card-body d-flex justify-content-between align-items-end p-0">
                                                    <div className="form-group mb-0 w-100">
                                                        <input onChange={e => setAvater(e.target.value)} type="file" name="avater" id="avater" className="input-file" />
                                                        <label htmlFor="avater" className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed">
                                                        <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                                        <span style={avater ? {color:"green"} : {}} className="js-fileName">{avater ? avater : "Click to select"}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss mb-2 text-dark">Background Image</label>
                                            <div className="card mt-3 border-0">
                                                <div className="card-body d-flex justify-content-between align-items-end p-0">
                                                    <div className="form-group mb-0 w-100">
                                                        <input onChange={e => setBackground(e.target.value)} type="file" name="background_image" id="background_image" className="input-file" />
                                                        <label htmlFor="background_image" className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed">
                                                        <i className="ti-cloud-down large-icon me-3 d-block"></i>
                                                        <span style={background ? {color:"green"} : {}} className="js-fileName">{ background ? background : "Click to select"}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {messages.length > 0 && <div className="col-lg-12">
                                            {messages.map((error, i) => {
                                                return <p key={i}>{error}</p>
                                            })}
                                        </div>}

                                        <div className="col-lg-12">
                                            <button onClick={submit} type="submit" className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block">Save</button>
                                        </div>
                                    </div>

                                </form>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>            
            </div>

            {/* <Popupchat /> */}
            <Appfooter /> 
        </Fragment>
    );
}

export default Account;