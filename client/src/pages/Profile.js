import React, { useState, useEffect , Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getUserPosts, getUser } from '../functions/request';

import Header from '../components/Header';
import Appfooter from '../components/Appfooter';
import Popupchat from '../components/Popupchat';

import Profiledetail from '../components/Profiledetail';
import ProfilecardThree from '../components/ProfilecardThree';
import Createpost from '../components/Createpost';
import Events from '../components/Events';
import Postview from '../components/Postview';
import Load from '../components/Load';
import Contacts from '../components/Contacts';
import Placeholder from '../components/Placeholder';

function Profile(props) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const mainUserId = useSelector((state) => state.user.data.payload.id)
    const params = useParams();
    const id = params.id || mainUserId;
    const [loaded, setLoaded] = useState(false);

    const onPostQuantityChanged = () => {
        getUserPosts(user.id).then(res => setPosts(res))
    }

    useEffect(() => {
        getUser(id).catch(e => props.history.push('/login')).then(res => setUser(res));
    }, [])

    useEffect(() => {
        getUserPosts(user.id).catch(e => props.history.push('/login')).then(res => {setPosts(res); setLoaded(true)});
    }, [user]);

    return (
        <Fragment> 
            <Header />
            {/* <Leftnav /> */}
            {/* <Rightchat /> */}


            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left pe-0">
                        <div className="row">
                            <div className="col-xl-12 mb-3">
                                {user.id && <ProfilecardThree user={user} />}
                            </div>
                            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
                                <Profiledetail user={user} />
                                {/* <Profilephoto user={user} /> */}
                                {user.id && <Contacts id={user.id} />}
                                <Events />
                            </div>
                            <div className="col-xl-8 col-xxl-9 col-lg-8">
                                {user.id && user.id === mainUserId &&  <Createpost update={onPostQuantityChanged}  avater={user.avater ? user.avater.url : "/assets/images/profile.png"} />}

                                {
                                    posts.map((post, idx) => {
                                        if(!post.main_image) post.main_image = {url: ""}
                                        if(!post.author.avater) post.author.avater = {url: ""}
                                        return(
                                            <Postview key={post.id} idx={idx} update={onPostQuantityChanged} postvideo="" id={post.id} userId={user.id} authorId={post.author.id} postimage={post.main_image.url} avater={user.avater ? user.avater.url : "/assets/images/profile.png"} authorname={post.author.username} time={post.created_at} des={post.body} />
                                        )
                                    })
                                }

                                {!loaded && 
                                    <Load/>
                                }

                                {loaded && posts.length === 0 && 
                                    <Placeholder/>
                                }
                            
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

export default Profile;