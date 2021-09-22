import React, {useEffect} from 'react';
import request from '../functions/request';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../features/user/userSlice';

function Logout(props) {

    const dispatch = useDispatch();


    useEffect(() => {
        request('/logout', 'GET').then(res => {
            dispatch(logOutUser());
            props.history.push('/login')
        })
    }, [])

    return (<></>)
}

export default Logout;