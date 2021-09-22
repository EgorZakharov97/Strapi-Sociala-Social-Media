import React, { useState, useEffect , Fragment } from "react";
import { getFriends } from '../functions/request';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import Placeholder from '../components/Placeholder';
import Load from '../components/Load';

function Member(props) {

    const [memberList, setMemberList] = useState([]);
    const id = useSelector(state => state.user.data.payload.id);
    const [loaded, wasLoaded] = useState(false);
    
    useEffect(() => {
        getFriends(id).catch(e => props.history.push('/auth/login')).then(res => {setMemberList(res); wasLoaded(true)});
    }, [])

    return (
        <Fragment> 
            <Header/>
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <Pagetitle title="Subscriptions"/>

                                <div className="row ps-2 pe-2">

                                    {memberList.length > 0 && memberList.map((user) => (
                                    <div key={user.id} className="col-md-3 col-sm-4 pe-2 ps-2">
                                        <a href={`/profile/${user.id}`}>
                                            <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                                <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                                    <figure className="overflow-hidden avatar ms-auto me-auto mb-0 position-relative w65 z-index-1"><img src={user.avater ? `${process.env.REACT_APP_DOMAIN}${user.avater.url}` : "/assets/images/profile.png"} alt="avater" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" /></figure>
                                                    <div className="clearfix w-100"></div>
                                                    <h4 className="fw-700 font-xsss mt-3 mb-0">{user.display_name} </h4>
                                                    <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">@{user.username}</p>
                                                    <a href={`/profile/${user.id}`} className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white">VIEW PROFILE</a>
                                                </div>
                                            </div>
                                        </a>
                                    </div> 
                                    ))}

                                    {!loaded && 
                                        <Load/>
                                    }

                                    {loaded && memberList.length === 0 &&
                                        <Placeholder/>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Popupchat />
            <Appfooter /> 

        </Fragment>
    );
}

export default Member;