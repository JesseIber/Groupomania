import { getPosts } from '../../services/posts'

export default function Posts({ userToken }) {
    const posts = getPosts(userToken)
    return <div className="post_container"></div>
}
