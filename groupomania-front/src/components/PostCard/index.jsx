import { faThumbsUp, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { deletePost } from '../../services/posts'

export default function PostCard({ post }) {
    const userValues = useContext(UserContext)['user']
    const date = new Date(post.created_at)

    const handleDelete = () => {
        deletePost(userValues.user.token, post._id)
    }

    return (
        <div className="postCard_container">
            <div className="postCard_header">
                <div className="postCard_author">{post.author}</div>
                <div className="postCard_date">
                    <span className="postCard_date">
                        {date.toLocaleDateString()}
                    </span>
                </div>
            </div>
            <div className="postCard_content">
                <p>{post.content}</p>
                <img src={post.imageUrl} />
            </div>
            <div className="postCard_groupAction">
                <div className="postCard_action">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="thumbAction mr-3"
                    />
                    {userValues.user.userId === post.userId ? (
                        <>
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="thumbAction mr-3"
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={handleDelete}
                                className="thumbAction"
                            />
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}
