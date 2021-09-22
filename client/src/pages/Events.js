import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import Pagetitle from '../components/Pagetitle';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';
import { getEvents } from '../functions/request';

function Events(props) {

    const [events, setEvents] = useState([]);

    const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    useEffect(() => {
        getEvents().catch(e => props.history.push('/login')).then(res => {
            setEvents(
                res.map(event => {
                    let date = new Date(event.date)
                    let formatted = {
                        day: date.getDate(),
                        month: monthNames[date.getMonth()]
                    }
                    event.date = formatted;
                    return event;
                })
            )
        });
        
    }, []);
    
    return (
        <> 
            <Header />

            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12">
                                
                                <Pagetitle title="Events"/>
                                
                                <div className="row ps-2 pe-1">
                                    {events.map((event , index) => (

                                    <a href={`/events/${event.id}`} key={index} className="col-md-3 col-xss-6 pe-2 ps-2">
                                        <div className="card h300 d-block border-0 shadow-xss rounded-3 bg-gradiant-bottom overflow-hidden mb-3 bg-image-cover" style={{backgroundImage: `url("${event.image.url}")`}}>
                                            <div className="card-body d-block w-100 position-absolute bottom-0 text-center">
                                                <div className="clearfix"></div>
                                                <h4 className="fw-600 position-relative z-index-1 ls-3 font-xssss text-white mt-2 mb-1">{event.title}</h4>
                                                <h5 className="fw-500 font-xs mt-0 mb-3 lh-3">{event.summary}</h5>
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

export default Events;