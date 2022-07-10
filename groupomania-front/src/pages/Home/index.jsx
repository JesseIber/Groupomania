import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { Navigate } from 'react-router-dom'
import WritePost from '../../components/WritePost'
import Posts from '../../components/Posts'

export default function Home() {
    const { user } = useContext(UserContext)
    if (!user) {
        return <Navigate to={'/login'} replace />
    }
    return (
        <div className="main_container">
            <WritePost />
            <Posts />
        </div>
    )
}
