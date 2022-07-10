import axios from 'axios'


export async function getPosts(user) {
    console.log(user.token)
    const response = axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }).catch(err => {
        console.log(err)
    })
    return response.data
}

export const createPost = (user, post) => {
    axios
        .post(`${process.env.REACT_APP_API_URL}/posts`,
            post, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            },
        })
        .catch(err => {
            console.log(err)
        })
}

export const updatePost = (userToken, userId, postId) => {
    fetch(`${process.env.REACT_APP_API_URL} / posts / ${postId}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
    }).then((res) => {
        console.log('success')
    }).catch((err) => {
        console.log(err)
    })
}

export const deletePost = (userToken, postId) => {
    fetch(`${process.env.REACT_APP_API_URL} / posts / ${postId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}