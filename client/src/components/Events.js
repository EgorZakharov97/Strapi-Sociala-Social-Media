import React, {useState, useEffect} from 'react';
import { getEvents } from '../functions/request';

function Events() {

    const [events, setEvents] = useState([]);

    const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    useEffect(() => {
        getEvents().then(res => {
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
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Events</h4>
                <a href="/events" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            {events.map((event , index) => (
            <a key={index} href={`/events/${event.id}`}>
                <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
                    <div className={`bg-success me-2 p-3 rounded-xxl bg-success`}><h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0"><span className="ls-1 d-block font-xsss text-white fw-600">{event.date.month}</span>{event.date.day}</h4></div>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-2">{event.title} <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">{event.summary}</span> </h4>
                </div>
            </a>
            ))}

            
        </div>
    );
}

export default Events;