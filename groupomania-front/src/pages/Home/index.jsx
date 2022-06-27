import { useContext } from 'react'
import AddPost from '../../components/AddPost'
import Posts from '../../components/Posts'
import UserContext from '../../contexts/UserContext'

export default function Home() {
    const { user } = useContext(UserContext)
    console.log(user)
    return (
        <div className="posts_container">
            {/* <AddPost />
            <Posts /> */}
            {!user && <h1>Non connecté</h1>}
            {user && <h1>Connecté, token : {user.token}</h1>}
        </div>
    )
}
