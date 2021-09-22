import React, {useState, useEffect} from 'react';
import { getPostLikes, likeOrUnlikePost, deletePost } from '../functions/request';


function Postview(props) {
        
    const {authorname ,time , des, avater , postimage , postvideo , id, userId} = props;
    const [likes, setLikes] = useState(0);
    const [open, setOpen] = useState(false);
    const canModify = userId === props.authorId;
    const menuClass = `${open ? " show" : ""}`;

    const likePost = async () => {
        const res = await likeOrUnlikePost(id)
        if(res.like) setLikes(likes+1)
        else setLikes(likes-1)
    }

    const onDeletePost = async () => {
        await deletePost(id);
        props.update();
    }

    const toggleOpen = () => {
        setOpen(!open)
    }

    useEffect(() => {
        getPostLikes(id).catch(e => props.history.push('/login')).then(res => setLikes(res));
    }, [])

    return (
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div style={{position: "relative"}} className="card-body p-0 d-flex">
                <a href={`/profile/${userId}`} ><figure className="avatar me-3"><img src={avater ? `${process.env.REACT_APP_DOMAIN}${avater}` : "/assets/images/profile.png"} alt="avater" className="shadow-sm rounded-circle w45" /></figure></a>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1"> {authorname} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500"> {time}</span></h4>
                {canModify && <div className="card-body d-flex p-0 mt-0">
                    <div className={`ms-auto pointer ${menuClass}`} id="dropdownMenu4" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleOpen}><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></div>
                    <div className={`dropdown-menu p-4 right-0 rounded-xxl border-0 shadow-lg ${menuClass}`} aria-labelledby="dropdownMenu4">
                        {/* <div className="card-body p-0 d-flex">
                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">Save Link <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span></h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">Hide Post <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                        </div> */}
                        <div onClick={onDeletePost} className="card-body p-0 d-flex mt-2">
                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4 pointer">Delete Post <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Delete Post</span></h4>
                        </div>
                        {/* <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4 pointer">Unfollow Group <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span></h4>
                        </div> */}
                    </div>

                </div>}
            </div>
            {postvideo ?  
            <div className="card-body p-0 mb-3 rounded-3 overflow-hidden uttam-die">
                <a href="/defaultvideo" className="video-btn">
                    <video autoPlay loop className="float-right w-100">
                        <source src={`${postvideo}`} type="video/mp4" />
                    </video>
                </a>
            </div>
            : ''}
            <div className="card-body p-0 me-lg-5">
                <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">{des}</p>
            </div>
            {postimage ?
            <div className="card-body d-block p-0 mb-3">
                <div className="row ps-2 pe-2">
                    <div className="col-sm-12 p-1"><img src={`${process.env.REACT_APP_DOMAIN}${postimage}`} className="rounded-3 w-100" alt="post" /></div>                                        
                </div>
            </div>
            : ''}
            <div className="card-body d-flex p-0">
                <div className="emoji-bttn pointer d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2" onClick={likePost}><i className="feather-thumbs-up text-white bg-primary-gradiant me-1 btn-round-xs font-xss"></i> <i className="feather-heart text-white bg-red-gradiant me-2 btn-round-xs font-xss"></i>{likes} Likes</div>
                <div className={`emoji-wrap pointer`}>
                    {/* <ul className="emojis list-inline mb-0">
                        <li className="emoji list-inline-item"><i className="em em---1"></i> </li>
                        <li className="emoji list-inline-item"><i className="em em-angry"></i></li>
                        <li className="emoji list-inline-item"><i className="em em-anguished"></i> </li>
                        <li className="emoji list-inline-item"><i className="em em-astonished"></i> </li>
                        <li className="emoji list-inline-item"><i className="em em-blush"></i></li>
                        <li className="emoji list-inline-item"><i className="em em-clap"></i></li>
                        <li className="emoji list-inline-item"><i className="em em-cry"></i></li>
                        <li className="emoji list-inline-item"><i className="em em-full_moon_with_face"></i></li>
                    </ul> */}
                </div>
                {/* <a href="/defaultvideo" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span className="d-none-xss">22 Comment</span></a> */}
                {/* <div className={`pointer ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss ${menuClass}`} id={`dropdownMenu${id}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleOpen}><i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"></i><span className="d-none-xs">Share</span></div>
                <div className={`dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg right-0 ${menuClass}`} aria-labelledby={`dropdownMenu${id}`}>
                    <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">Share <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2"></i></h4>
                    <div className="card-body p-0 d-flex">
                        <ul className="d-flex align-items-center justify-content-between mt-2">
                            <li className="me-1"><span className="btn-round-lg pointer bg-facebook"><i className="font-xs ti-facebook text-white"></i></span></li>
                            <li className="me-1"><span className="btn-round-lg pointer bg-twiiter"><i className="font-xs ti-twitter-alt text-white"></i></span></li>
                            <li className="me-1"><span className="btn-round-lg pointer bg-linkedin"><i className="font-xs ti-linkedin text-white"></i></span></li>
                            <li className="me-1"><span className="btn-round-lg pointer bg-instagram"><i className="font-xs ti-instagram text-white"></i></span></li>
                            <li><span className="btn-round-lg pointer bg-pinterest"><i className="font-xs ti-pinterest text-white"></i></span></li>
                        </ul>
                    </div>
                    <div className="card-body p-0 d-flex">
                        <ul className="d-flex align-items-center justify-content-between mt-2">
                            <li className="me-1"><span className="btn-round-lg pointer bg-tumblr"><i className="font-xs ti-tumblr text-white"></i></span></li>
                            <li className="me-1"><span className="btn-round-lg pointer bg-youtube"><i className="font-xs ti-youtube text-white"></i></span></li>
                            <li className="me-1"><span className="btn-round-lg pointer bg-flicker"><i className="font-xs ti-flickr text-white"></i></span></li>
                            <li className="me-1"><span className="btn-round-lg pointer bg-black"><i className="font-xs ti-vimeo-alt text-white"></i></span></li>
                            <li><span className="btn-round-lg pointer bg-whatsup"><i className="font-xs feather-phone text-white"></i></span></li>
                        </ul>
                    </div>
                    <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">Copy Link</h4>
                    <i className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500"></i>
                    <input type="text" placeholder="https://socia.be/1rGxjoJKVF0" className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg" />
                </div> */}
            </div>
        </div>
    );
}

export default Postview;