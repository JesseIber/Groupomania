import {
    faThumbsUp,
    faEdit,
    faTrash,
    faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { deletePost } from '../../services/posts'

export default function PostCard({ post }) {
    const userValues = useContext(UserContext)
    const date = new Date(post.created_at)

    const handleDelete = () => {
        deletePost(userValues.user.token, post._id)
    }

    return (
        <div className="postCard">
            <div className="postCard__content card">
                <div className="card__header">
                    <p>auteur</p>
                    <div className="">
                        <p>{date.toLocaleDateString()}</p>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                </div>
                <div className="card__content">
                    <p>{post.content}</p>
                </div>
            </div>
            {post.imageUrl && (
                <div className="postCard__image">
                    <img src={post.imageUrl} width="250" />
                </div>
            )}
        </div>
        // <div className="postCard_container">
        //     <div className="postCard_header">
        //         <div className="postCard_author">{post.author}</div>
        //         <div className="postCard_date">
        //             <span className="postCard_date">
        //                 {date.toLocaleDateString()}
        //             </span>
        //         </div>
        //     </div>
        //     <div className="postCard_content">
        //         <p>{post.content}</p>
        //         <img src={post.imageUrl} />
        //     </div>
        //     <div className="postCard_groupAction">
        //         <div className="postCard_action">
        //             <FontAwesomeIcon
        //                 icon={faThumbsUp}
        //                 className="thumbAction mr-3"
        //             />
        //             {userValues.user.userId === post.userId ? (
        //                 <>
        //                     <FontAwesomeIcon
        //                         icon={faEdit}
        //                         className="thumbAction mr-3"
        //                     />
        //                     <FontAwesomeIcon
        //                         icon={faTrash}
        //                         onClick={handleDelete}
        //                         className="thumbAction"
        //                     />
        //                 </>
        //             ) : (
        //                 ''
        //             )}
        //         </div>
        //     </div>
        // </div>
    )
}
