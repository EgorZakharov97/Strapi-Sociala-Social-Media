import React,{ useState, useEffect } from 'react';
import { getFriends } from '../functions/request';

function Contacts(props) {

    const [ subscriptions, setSubscriptions ] = useState([]);

    useEffect(() => {
        getFriends(props.id, 10).then(setSubscriptions);
    }, []);

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center p-4">
                <h4 className="fw-700 mb-0 font-xssss text-grey-900">Subscriptions</h4>
                <a href="/subscriptions" className="fw-600 ms-auto font-xssss text-primary">See all</a>
            </div>
            {subscriptions.map((subscription , index) => (
            <a href={`/profile/${subscription.id}`} key={index} className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3 mb-3">
                <figure className="avatar me-2 mb-0"><img src={subscription.avater.url} alt="avater" className="shadow-sm rounded-circle w45" /></figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-2">{subscription.display_name} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{subscription.username}</span></h4>
                <a href={`/profile/${subscription.id}`} className="btn-round-sm bg-white ms-auto mt-2"><span className="feather-chevron-right font-xss text-grey-900"></span></a>
            </a>

            ))}

            
        </div>
    );
}

export default Contacts;