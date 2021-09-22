import React from 'react';
import { BrowserRouter, Switch, Route, Redirect  } from 'react-router-dom';
import { loadUser } from './features/user/userSlice';
import { useDispatch } from 'react-redux';
import client from './functions/Graphql';
import { ApolloProvider } from '@apollo/client';


// Common Layout
import Home from './pages/Home';
import People from './pages/People';
import Friends from './pages/Friends';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Event from './pages/Event';
import Events from './pages/Events';
import Logout from './pages/Logout';
import ForgotPassword from './pages/ForgotPassword';
import NewPassword from './pages/NewPassword';
import AuthCommon from './pages/AuthCommon';

function App() {

    const dispatch = useDispatch();
    dispatch(loadUser())

    return(
        <ApolloProvider client={client}>
            <BrowserRouter basename={'/'}>

                <Switch>

                    <Route path={`${process.env.PUBLIC_URL}/auth`} >

                        <AuthCommon>

                        <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} />
                        <Route exact path={`${process.env.PUBLIC_URL}/auth/logout`} component={Logout} />
                        <Route exact path={`${process.env.PUBLIC_URL}/auth/register`} component={Register} />
                        <Route exact path={`${process.env.PUBLIC_URL}/auth/forgot`} component={ForgotPassword} />
                        <Route exact path={`${process.env.PUBLIC_URL}/auth/new-password`} component={NewPassword} />

                        </AuthCommon>

                    </Route>

                    <Redirect from="/login" to="/auth/login" />

                    <ProtectedRoutes>

                        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/groups`} component={Home}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/people`} component={People}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/chat`} component={Home}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/subscriptions`} component={Friends}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/settings`} component={Settings}/>
                        {/* <Route exact path={`${process.env.PUBLIC_URL}/settings/password`} component={Password}/> */}
                        <Route exact path={`${process.env.PUBLIC_URL}/settings/account`} component={Account}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/events`} component={Events}/>
                        <Route exact path={`${process.env.PUBLIC_URL}/events/:id`} component={Event}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/profile`} component={Profile}/>

                        <Route exact path={`${process.env.PUBLIC_URL}/profile/:id`} component={Profile}/>
                
                    </ProtectedRoutes>

                </Switch>

            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App