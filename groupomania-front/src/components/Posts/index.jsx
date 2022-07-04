import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { getPosts } from '../../services/posts'
import PostCard from '../PostCard'

export default function Posts() {
    const userValues = useContext(UserContext)['user']
    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPosts(userValues.user, setPosts)
    }, [])
    return (
        <>
            {posts.map((post) => (
                <PostCard post={post} key={post._id} />
            ))}
        </>
    )
}
