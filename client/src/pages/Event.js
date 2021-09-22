import React, { useEffect, useState, Fragment } from "react";
import { getEvent } from '../functions/request';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import EventDescription from '../components/EventDescription';
import ProfilecardTwo from '../components/ProfilecardTwo';



function Event(props) {

    const [event, setEvent] = useState({});
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getEvent(id).catch(e => props.history.push('/login')).then(res => setEvent(res));
    }, []);

    return (
        <Fragment> 
            <Header />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                <ProfilecardTwo event={event} />
                            </div>
                            <div className="col-xl-12 col-xxl-12 col-lg-12">
                                <EventDescription description={event.description} />
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

export default Event;