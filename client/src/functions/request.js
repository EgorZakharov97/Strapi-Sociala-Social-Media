const paramsGlobal = {
    headers: { 'Content-Type': 'application/json'},
    credentials: 'same-origin',
}

const request = (url, method, body) => {
    const params = {...paramsGlobal};
    params.method = method || 'GET';
    if (params.method !== 'GET' && params.method !== 'HEAD')
        params.body = JSON.stringify(body || {})
    return fetch(url, params).then(res => res.json()).then(res => {
        if(res.message) throw new Error(res.message);
        else return res;
    })
}

export default request

export const updatePassword = (code, password, passwordConfirmation) => {
    return request(`/auth/reset-password`, 'POST', {code, password, passwordConfirmation});
}

export const resetPassword = (email) => {
    return request(`/auth/forgot-password`, 'POST', {
        email,
        url: `http://localhost:3000/new-password`
    })
}

export const getEvent = (id) => {
    return request(`/events/${id}`)
}

export const getEvents = () => {
    return request('/events')
}

export const getPosts = () => {
    return request('/posts')
}

export const getUserPosts = (userId) => {
    return request(`/users/${userId}/posts`)
}

export const login = (identifier, password) => {
    return request('/auth/local', 'POST', {identifier, password})
}

export const register = (user) => {
    return request('/auth/local/register', 'POST', user)
}

export const getPeople = () => {
    return request('/users')
}

export const getUser = (userId) => {
    return request(`/users/${userId}`)
}

export const isFriend = (userId) => {
    return request(`/users/${userId}/is-friend`)
}

export const getFriends = (id, limit) => {
    if (!limit) return request(`/users/${id}/friends`);
    else return request(`/users/${id}/friends?limit=${limit}`);
}

export const getNotFriends = () => {
    return request('/users/not-friends')
}

export const getMe = () => {
    return request(`/users/me`)
}

export const likeOrUnlikePost = (postId) => {
    return request(`/posts/${postId}/like`, 'POST', {})
}

export const getPostLikes = (postId) => {
    return request(`/posts/${postId}/like/count`)
}

export const deletePost = (postId) => {
    return request(`/posts/${postId}`, 'DELETE')
}

export const updatePost = (postId, post) => {
    return request(`/posts/${postId}`, 'PUT', post)
}

export const subscribeToUser = (userId) => {
    return request(`/friends`, 'POST', {for: userId})
}

export const unsubscribeFromUser = (userId) => {
    return request(`/friends/${userId}`, 'DELETE', {for: userId})
}

export const createPost = (userId, post) => {
    post.author = userId;
    return request('/posts', 'POST', post)
}