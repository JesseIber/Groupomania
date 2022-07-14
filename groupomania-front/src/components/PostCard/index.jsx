import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import useModal from '../../hooks/useModal'
import { deletePost, like } from '../../services/posts'
import Modal from '../Modal'
import UpdatePost from '../UpdatePost'

export default function PostCard({ post, isAdminValue }) {
    const userValues = useContext(UserContext)
    const date = new Date(post.created_at)
    const idSubMenu = 'menu-'.concat('', post._id)
    const { isShowing, toggle } = useModal()
    const initialValue = post.usersLiked.includes(userValues.user.userId)
        ? 1
        : 0
    const [isLiked, setIsLiked] = useState(initialValue)
    useEffect(() => {
        if (isLiked !== initialValue) {
            like(
                userValues.user.token,
                userValues.user.userId,
                post._id,
                isLiked
            )
        }
    }, [isLiked])

    const handleClickSubMenu = () => {
        const subMenu = document.getElementById(idSubMenu)
        if (subMenu.classList.contains('hide')) {
            subMenu.classList.remove('hide')
        } else {
            subMenu.classList.add('hide')
        }
    }
    const handleDelete = () => {
        deletePost(userValues.user.token, post._id)
    }

    const handleUpdate = () => {
        const subMenu = document.getElementById(idSubMenu)
        subMenu.classList.add('hide')
        toggle()
    }

    const handleLike = (value) => {
        setIsLiked(value)
    }
    return (
        <div className="postCard card">
            <div className="postCard__mainContent">
                <div className="postCard__header">
                    <div className="postCard__mainInfo">
                        <p>{post.author}</p>
                        <p>{date.toLocaleDateString()}</p>
                    </div>
                    {userValues.user.userId === post.userId || isAdminValue ? (
                        <div className="icon__toggleMenu">
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                onClick={handleClickSubMenu}
                            />
                            <div
                                className="postCard__submenu hide"
                                id={idSubMenu}
                            >
                                <ul>
                                    <li className="postCard__submenu__li">
                                        <button
                                            className="postCard__submenu__btn"
                                            onClick={handleUpdate}
                                        >
                                            Éditer
                                        </button>
                                    </li>
                                    <li className="postCard__submenu__li">
                                        <button
                                            className="postCard__submenu__btn"
                                            onClick={handleDelete}
                                        >
                                            Supprimer
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className="postCard__text">
                    <p>{post.content}</p>
                    {post.imageUrl && (
                        <div className="postCard__image">
                            <img alt="" src={post.imageUrl} width="250" />
                        </div>
                    )}
                </div>
                <div className="postCard__like">
                    <span>
                        {isLiked ? (
                            <>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="icon__like icon__like__isLiked mr-1"
                                    onClick={() => handleLike(0)}
                                />
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className="icon__like icon__like__isNotLiked mr-1"
                                    onClick={() => handleLike(1)}
                                />
                            </>
                        )}
                        ({post.likes}) Utilisateur(s) aime ce post
                    </span>
                </div>
            </div>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                title={'Modifier mon post'}
            >
                <UpdatePost post={post} toggle={toggle} />
            </Modal>
        </div>
    )
}
