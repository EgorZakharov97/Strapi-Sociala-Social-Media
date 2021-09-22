import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function ProtectedRoutes(props) {
    const user = useSelector((state) => state.user.data)
    if(user) return props.children
    else return <Redirect to='/login' />
}

export default ProtectedRoutes