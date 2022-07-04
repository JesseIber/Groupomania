import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import { createPost } from '../../services/posts'
import { useState } from 'react'

export default function WritePost() {
    const userValues = useContext(UserContext)['user']
    const [selectedFile, setSelectedFile] = useState(null)
    const [content, setContent] = useState(null)
    const [error, setError] = useState()

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (content === null) {
            setError('Le contenu de votre message ne peut être vide.')
        } else {
            const fd = new FormData()
            fd.append('userId', userValues.user.userId)
            fd.append('content', content)
            fd.append('image', selectedFile)
            createPost(userValues.user, fd)
        }
    }

    return (
        <>
            <p className="title">Que voulez vous poster?</p>
            <form className="mb-5" onSubmit={handleSubmit}>
                {error ? <p>{error}</p> : ''}
                <div className="d-flex">
                    <input
                        type="text"
                        id="content"
                        name="content"
                        className="form-input m-0 mr-3 flex-1"
                        onChange={(e) => setContent(e.target.value)}
                    ></input>
                    <input
                        className="form_inputfile"
                        id="image"
                        name="image"
                        type="file"
                        onChange={handleFileSelect}
                    />
                    <label htmlFor="image">
                        <FontAwesomeIcon icon={faUpload} />
                        &nbsp; Ajouter une image
                    </label>
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
