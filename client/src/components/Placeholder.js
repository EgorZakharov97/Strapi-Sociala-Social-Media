import React from 'react';

function Placeholder(props) {
    return (
        <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
            <div className="snippet mt-2 ms-auto me-auto">
                <p>{props.message ? props.message : "There is no content yet..."}</p>
            </div>
        </div>
    );
}

export default Placeholder;