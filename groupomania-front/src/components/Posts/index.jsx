import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { isAdmin } from '../../services/posts'
import PostCard from '../PostCard'

export default function Posts() {
    const userValues = useContext(UserContext)
    const [data, setData] = useState([])
    const [isAdminValue, setIsAdmin] = useState()
    useEffect(() => {
        isAdmin(userValues.user.userId, userValues.user.userToken).then(
            (data) => {
                setIsAdmin(data.isAdmin)
            }
        )
        const fetchPost = async () => {
            try {
                const { data: response } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/posts`,
                    {
                        headers: {
                            Authorization: `Bearer ${userValues.user.token}`,
                        },
                    }
                )
                setData(response)
            } catch (err) {
                console.log(err)
            }
        }
        const id = setInterval(() => {
            fetchPost()
        }, 500)

        fetchPost()
        return () => clearInterval(id)
    }, [])

    return (
        <>
            {data.map((post) => (
                <PostCard
                    post={post}
                    key={post._id}
                    isAdminValue={isAdminValue}
                />
            ))}
        </>
    )
}
