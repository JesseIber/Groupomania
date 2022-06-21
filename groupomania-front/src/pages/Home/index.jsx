import AddPost from '../../components/AddPost'
import Posts from '../../components/Posts'

export default function Home({ user }) {
    return (
        <div className="posts_container">
            <AddPost />
            <Posts userToken={user.token} />
        </div>
    )
}
