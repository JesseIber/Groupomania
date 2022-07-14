import { faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import { updatePost } from '../../services/posts'

export default function UpdatePost({ post, toggle }) {
    const userValues = useContext(UserContext)
    const [selectedFileUpdate, setSelectedFileUpdate] = useState(null)
    const [previewUpdate, setPreviewUpdate] = useState()
    const [contentUpdate, setContentUpdate] = useState(null)
    const [currentPict, setCurrentPict] = useState(post.imageUrl)

    useEffect(() => {
        if (!selectedFileUpdate) {
            setPreviewUpdate(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFileUpdate)
        setPreviewUpdate(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFileUpdate])

    const handleFileSelect = (e) => {
        setSelectedFileUpdate(e.target.files[0])
    }

    const handleDeleteFile = () => {
        setSelectedFileUpdate(null)
        setPreviewUpdate(undefined)
        document.getElementById('image').value = null
    }

    const handleDeleteExistantFile = () => {
        setCurrentPict(null)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('userId', userValues.user.userId)
        fd.append('author', userValues.user.author)
        if (contentUpdate === null) {
            fd.append('content', post.content)
        } else {
            fd.append('content', contentUpdate)
        }
        if (selectedFileUpdate !== null) {
            fd.append('image', selectedFileUpdate)
        } else if (currentPict === null) {
            fd.append('image', -1)
        }
        updatePost(userValues.user, fd, post._id)
        toggle()
    }

    return (
        <>
            <form className="mb-5" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="contentUpdate">
                        Contenu du post
                    </label>
                    <input
                        className="form-input"
                        name="contentUpdate"
                        id="contentUpdate"
                        defaultValue={post.content}
                        onChange={(e) => setContentUpdate(e.target.value)}
                    ></input>
                </div>
                <input
                    className="form_inputfile"
                    id="imageUpdate"
                    name="imageUpdate"
                    type="file"
                    onChange={handleFileSelect}
                />
                <label htmlFor="imageUpdate">
                    <FontAwesomeIcon icon={faPaperclip} />
                </label>
                <div className="split_image">
                    {currentPict && (
                        <div className="last_image">
                            <p className="mt-5 mb-5 text-gray">
                                Image d'origine :
                            </p>
                            <div className="card__preview">
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="card__deleteAttachment"
                                    onClick={handleDeleteExistantFile}
                                />
                                <img alt="" src={post.imageUrl} />
                            </div>
                        </div>
                    )}
                    {selectedFileUpdate && (
                        <div>
                            <p className="mt-5 mb-5 text-gray">
                                Nouvelle image :
                            </p>
                            <div className="card__preview">
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="card__deleteAttachment"
                                    onClick={handleDeleteFile}
                                />
                                <img alt="" src={previewUpdate} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="btn-group-inline justify-end">
                    <button type="submit" className="btn btn-primary">
                        Modifier
                    </button>
                </div>
            </form>
        </>
    )
}
