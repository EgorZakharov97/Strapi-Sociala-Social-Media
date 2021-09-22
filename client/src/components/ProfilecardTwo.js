import React from 'react';

function ProfilecardTwo(props) {

    const monthNames = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const event = props.event;

    let date = event.date ? new Date(event.date) : new Date();
    let formatted = {
        day: date.getDate(),
        month: monthNames[date.getMonth()]
    }
    event.date = formatted;

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3 overflow-hidden">
            <div className="card-body position-relative h240 bg-image-cover bg-image-center" 
            style={{backgroundImage: `url("${props.event.image ? props.event.image.url : ""}")`}}></div>
            <div className="card-body d-block pt-4 text-center position-relative">

                <h4 className="font-xs ls-1 fw-700 text-grey-900">{props.event.title} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{event.summary}</span></h4>
                <div className="d-flex align-items-center pt-0 position-absolute left-15 top-10 mt-4 ms-2">
                    <h4 className="font-xsssss text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2"><b className="text-grey-900 mb-1 font-sm fw-700 d-inline-block ls-3 text-dark">{event.date.day} </b> {event.date.month}</h4>
                </div>
            </div>
            
            {/* <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                <ul className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4" id="pills-tab" role="tablist">
                    <li className="active list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active" href="#navtabs1" data-toggle="tab">About</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs2" data-toggle="tab">Membership</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs3" data-toggle="tab">Discussion</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs4" data-toggle="tab">Video</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs3" data-toggle="tab">Group</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs1" data-toggle="tab">Events</a></li>
                    <li className="list-inline-item me-5"><a className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block" href="#navtabs7" data-toggle="tab">Media</a></li>
                    <li className="list-inline-item ms-auto mt-3 me-4"><a href="/home" className=""><i className="ti-more-alt text-grey-500 font-xs"></i></a></li>
                </ul>
            </div> */}
        </div>
        
    );
}

export default ProfilecardTwo;