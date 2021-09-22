import request from './request';

export const getNotFriends = (userId) => {
    return request("/users/not-friends")
}