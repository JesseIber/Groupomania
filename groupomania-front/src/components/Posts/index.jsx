import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import PostCard from '../PostCard'

export default function Posts() {
    const { user } = useContext(UserContext)
    const [data, setData] = useState([])
    const [value, setValue] = useState()

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data: response } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/posts`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    }
                )
                setData(response)
            } catch (err) {
                console.log(err)
            }
        }
        fetchPost()
    }, [value])

    return (
        <>
            {data.map((post) => (
                <PostCard post={post} key={post._id} setValue={setValue} />
            ))}
        </>
    )
}
