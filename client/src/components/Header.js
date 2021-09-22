import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Darkbutton from '../components/Darkbutton';

function Header(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isNoti, setIsNoti] = useState(false);
    const user = useSelector((state) => state.user.data.payload);

    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleActive = () => setIsActive(!isActive);
    const toggleisNoti = () => setIsNoti(!isNoti);

    const navClass = `${isOpen ? " nav-active" : ""}`;
    const buttonClass = `${isOpen ? " active" : ""}`;
    const searchClass = `${isActive ? " show" : ""}`;
    const notiClass = `${isNoti ? " show" : ""}`;

    return (
        <div className="nav-header bg-white shadow-xs border-0">
            <div className="nav-top">
                <Link to="/"><i className="feather-zap text-success display2-size me-3 ms-0"></i><span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">Sociala. </span> </Link>
                <Link to="/" className="mob-menu ms-auto me-2 chat-active-btn"><i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i></Link>
                <span onClick={toggleActive} className="me-2 menu-search-icon mob-menu"><i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></span>
                <button onClick={toggleOpen} className={`nav-menu me-0 ms-2 ${buttonClass}`}></button>
            </div>
            
            <form action="#" className="float-left header-search ms-3">
            </form>   
            <span className={`p-2 pointer text-center ms-auto menu-icon ${notiClass}`} id="dropdownMenu3" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleisNoti}><span className="dot-count bg-warning"></span><i className="feather-bell font-xl text-current"></i></span>
            <Darkbutton />
            <Link to="/profile" className="p-0 ms-3 menu-icon"><img src={user.avater ? user.avater.url : "/assets/images/profile.png"} alt="user" className="w40 mt--1" /></Link>

            <nav className={`navigation  scroll-bar ${navClass}`}>
                <div style={{height: '100%'}} className="container ps-0 pe-0">
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%'}} className="nav-content">
                        <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span>New </span>Feeds</div>
                            <ul className="mb-1 top-content">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li><Link to="/" className="nav-content-bttn open-font"><i className="feather-tv btn-round-md bg-blue-gradiant me-3"></i><span>Newsfeed</span></Link></li>
                                <li><Link to="/events" className="nav-content-bttn open-font"><i className="feather-award btn-round-md bg-red-gradiant me-3"></i><span>Events</span></Link></li>
                                <li><Link to="/groups" className="nav-content-bttn open-font"><i className="feather-zap btn-round-md bg-mini-gradiant me-3"></i><span>Groups</span></Link></li>
                                <li><Link to="/people" className="nav-content-bttn open-font"><i className="feather-globe btn-round-md bg-gold-gradiant me-3"></i><span>People</span></Link></li>
                                <li><Link to="/subscriptions" className="nav-content-bttn open-font"><i className="feather-user btn-round-md bg-primary-gradiant me-3"></i><span>Subscriptions</span></Link></li>                        
                            </ul>
                        </div>
                        <div style={{marginBottom: '3rem'}} className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                            <div className="nav-caption fw-600 font-xssss text-grey-500"><span></span> Account</div>
                            <ul className="mb-1">
                                <li className="logo d-none d-xl-block d-lg-block"></li>
                                <li><Link to="/settings" className="nav-content-bttn open-font h-auto pt-2 pb-2"><i className="font-sm feather-settings me-3 text-grey-500"></i><span>Settings</span></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            
            <div className={`app-header-search ${searchClass}`}>
                <form className="search-form">
                    <div className="form-group searchbox mb-0 border-0 p-1">
                        <input type="text" className="form-control border-0" placeholder="Search..." />
                        <i className="input-icon">
                            <ion-icon name="search-outline" role="img" className="md hydrated" aria-label="search outline"></ion-icon>
                        </i>
                        <span className="ms-1 mt-1 d-inline-block close searchbox-close">
                            <i className="ti-close font-xs" onClick={toggleActive}></i>
                        </span>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Header