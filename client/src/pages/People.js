import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import { getPeople } from '../functions/request';

function People(props) {

    const [ people, setPeople ] = useState([]);

    useEffect(() => {
        getPeople().catch(e => props.history.push('/login')).then(setPeople);
    }, [])
    
    return (
        <> 
            <Header />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                
                                <Pagetitle title="People"/>
                                
                                <div className="row ps-2 pe-1">
                                    {people.map((person , index) => (
                                    
                                    <a href={`/profile/${person.id}`} key={index} className="col-md-6 col-sm-6 pe-2 ps-2">
                                        <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-0 mt-2">
                                            <div className="card-body position-relative h100 bg-image-cover bg-image-center" style={{backgroundImage: `url("${person.background_image ? person.background_image.url : "assets/images/default_background.jpg"}")`}}></div>
                                            <div className="card-body d-block w-100 pl-10 pe-4 pb-4 pt-0 text-left position-relative">
                                                <figure className="avatar position-absolute w75 z-index-1 left-15" style={{marginTop: `-40px` }}><img src={`${person.avater ? person.avater.url : "assets/images/profile.png"}`} alt="avater" className="float-right p-1 bg-white rounded-circle w-100 " /></figure>
                                                <div className="clearfix"></div>
                                                <h4 className="fw-700 font-xsss mt-3 mb-1">{person.display_name}</h4>
                                                <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3 lh-3">{person.username}</p>
                                                <span className="position-absolute right-15 top-0 d-flex align-items-center">
                                                    <a href={`/profile/${person.id}`} className="text-center p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white">VIEW</a>
                                                </span>
                                            </div>
                                        </div>
                                    </a>

                                    ))}                                    

                                </div>
                            </div>               
                        </div>
                    </div>
                    
                </div>
            </div>

            <Popupchat />
            <Appfooter /> 
        </>
    );
}

export default People;