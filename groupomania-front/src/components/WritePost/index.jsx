import {
    faPaperclip,
    faPaperPlane,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { createPost } from '../../services/posts'
import { useState } from 'react'
import { useEffect } from 'react'

export default function WritePost() {
    const userValues = useContext(UserContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState()
    const [content, setContent] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleDeleteFile = () => {
        setSelectedFile(null)
        setPreview(undefined)
        document.getElementById('image').value = null
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (content === null) {
            setError('Le contenu de votre message ne peut être vide.')
        } else {
            const fd = new FormData()
            fd.append('userId', userValues.user.userId)
            fd.append('author', userValues.user.email)
            fd.append('content', content)
            fd.append('image', selectedFile)
            createPost(userValues.user, fd)
        }
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card__header p-2">
                        <p>Ajouter un nouveau post</p>
                        <input
                            className="form_inputfile"
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileSelect}
                        />
                        <label htmlFor="image">
                            <FontAwesomeIcon icon={faPaperclip} />
                        </label>
                    </div>
                    <input
                        type="text"
                        id="content"
                        name="content"
                        className="form_inputPost m-0"
                        placeholder="Écrivez quelque chose..."
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                    <div className="card__action">
                        {selectedFile && (
                            <div className="card__preview">
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className="card__deleteAttachment"
                                    onClick={handleDeleteFile}
                                />
                                <img src={preview} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="btn-group-inline justify-end">
                    <button type="submit" className="btn btn-primary">
                        Publier
                    </button>
                </div>
            </form>
        </>
    )
}
