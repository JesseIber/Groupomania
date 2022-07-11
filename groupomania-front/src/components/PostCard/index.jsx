import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect } from 'react'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import useModal from '../../hooks/useModal'
import { deletePost } from '../../services/posts'
import Modal from '../Modal'
import UpdatePost from '../UpdatePost'

export default function PostCard({ post, setValue }) {
    const userValues = useContext(UserContext)
    const date = new Date(post.created_at)
    const idSubMenu = 'menu-'.concat('', post._id)
    const { isShowing, toggle } = useModal()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const isAdmin = () => {
            try {
                const { data: response } = axios.get(
                    `${process.env.REACT_APP_API_URL}/auth/isAdmin/${userValues.user.userId}}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userValues.user.token}`,
                        },
                    }
                )
                setIsAdmin(response)
            } catch (error) {
                console.log(error)
            }
        }
        isAdmin()
    }, [])

    const handleClickSubMenu = () => {
        const subMenu = document.getElementById(idSubMenu)
        if (subMenu.classList.contains('hide')) {
            subMenu.classList.remove('hide')
        } else {
            subMenu.classList.add('hide')
        }
    }

    const refresh = () => {
        setValue({})
    }

    const handleDelete = () => {
        deletePost(userValues.user.token, post._id)
        refresh()
    }

    return (
        <div className="postCard card">
            <div className="postCard__mainContent">
                <div className="postCard__header">
                    <p>{post.author}</p>
                    <p>{date.toLocaleDateString()}</p>
                </div>
                <div className="postCard__text">
                    <p>{post.content}</p>
                    {post.imageUrl && (
                        <div className="postCard__image">
                            <img src={post.imageUrl} width="250" />
                        </div>
                    )}
                </div>
            </div>
            {userValues.user.userId === post.userId ? (
                <div className="icon__toggleMenu">
                    <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        onClick={handleClickSubMenu}
                    />
                    <div className="postCard__submenu hide" id={idSubMenu}>
                        <ul>
                            <li className="postCard__submenu__li">
                                <button
                                    className="postCard__submenu__btn"
                                    onClick={toggle}
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
            <Modal
                isShowing={isShowing}
                hide={toggle}
                title={'Modifier mon post'}
            >
                <UpdatePost post={post} toggle={toggle} setValue={setValue} />
            </Modal>
        </div>
    )
}
