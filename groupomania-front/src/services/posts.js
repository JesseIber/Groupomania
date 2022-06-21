
export const getPosts = (userToken) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
    }).then((res) => {
        return res
    })
        .catch((err) => {
            console.log(err)
        })
}

export const createPost = (userToken, post) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
        body: post
    }).then((res) => {
        console.log('success')
    }).catch((err) => {
        console.log(err)
    })
}

export const updatePost = (userToken, userId, postId) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
    }).then((res) => {
        console.log('success')
    }).catch((err) => {
        console.log(err)
    })
}

export const deletePost = (userToken, userId, postId) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Authorization': `Bearer ${userToken}` },
        body: postId
    }).then((res) => {
        console.log('success')
    }).catch((err) => {
        console.log(err)
    })
}