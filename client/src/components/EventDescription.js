import React from 'react';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Postview(props) {
        
    const description = props.description || "";



    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div className="card-body p-0 me-lg-5">
                <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                    <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
                </p>
            </div>
        </div>
    );
}

export default Postview;