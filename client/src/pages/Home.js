import React, { useState, useEffect , Fragment } from "react";
import { getPosts } from '../functions/request';
import Header from '../components/Header';
import { useSelector } from "react-redux";
import Createpost from '../components/Createpost';
import Friendslider from '../components/Friendslider';
import Postview from '../components/Postview';
import Placeholder from '../components/Placeholder';
import Load from '../components/Load';

function Home(props) {

    const [posts, setPosts] = useState([]);
    const user = useSelector((state) => state.user.data.payload);
    const userId = user.id;
    const [loaded, setLoaded] = useState(false);

    const onPostQuantityChanged = () => {
        getPosts().catch(e => props.history.push('/login')).then(res => {setPosts(res); setLoaded(true)})
    }
    
    useEffect(() => {
        getPosts().catch(e => props.history.push('/login')).then(res => {setPosts(res); setLoaded(true)})
    }, []);

    return (
        <Fragment> 
            <Header/>
            <div className="main-content right-chat-active">
                <div className="middle-sidebar-bottom">
                    <div className="middle-sidebar-left">
                        <div className="row feed-body">
                            <div className="col-xl-12 col-xxl-12 col-lg-12">
                                <Friendslider {...props} />
                                <Createpost update={onPostQuantityChanged}  avater={user.avater ? user.avater.url : "/assets/images/profile.png"} />

                                {
                                    posts.map((post, idx) => {
                                        if(!post.main_image) post.main_image = {url: ""}
                                        if(!post.author.avater) post.author.avater = {url: ""}
                                        return(
                                            <Postview {...props} key={post.id} idx={idx} update={onPostQuantityChanged} postvideo="" id={post.id} userId={userId} authorId={post.author.id} postimage={post.main_image.url} avater={post.author.avater.url} authorname={post.author.username} time={post.created_at} des={post.body} />
                                        )
                                    })
                                }

                                {!loaded &&
                                    <Load/>
                                }

                                {loaded && posts.length === 0 &&
                                    <Placeholder />
                                }

                                {loaded && posts.length !== 0 &&
                                    <Placeholder message={"You've reached the bottom"} />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;