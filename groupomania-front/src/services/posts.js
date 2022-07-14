import axios from 'axios'

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

export const updatePost = (user, fd, postId) => {
    axios
        .put(`${process.env.REACT_APP_API_URL}/posts/${postId}`,
            fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${user.token}`
            },
        })
        .catch(err => {
            console.log(err)
        })
}

export const deletePost = (userToken, postId) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
    })
}

export const like = (userToken, userId, postId, isLiked) => {
    axios
        .post(`${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
            {
                userId: userId,
                like: isLiked
            }, {
            headers: { 'Authorization': `Bearer ${userToken}` }
        })
        .catch(err => {
            console.log(err)
        })
}

export const isAdmin = async (userId, userToken) => {
    try {
        const { data: res } = await axios
            .get(`${process.env.REACT_APP_API_URL}/auth/isAdmin/${userId}`,
                null, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            })
        return res
    } catch (error) {
        console.log(error)
    }
}