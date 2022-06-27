import logo from '../../assets/img/logo.png'
import Loader from '../../components/Loader'
import { useContext, useEffect, useRef, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import Modal from '../../components/Modal'
import useModal from '../../hooks/useModal'
import RegisterComponent from '../../components/Register'
import * as Yup from 'yup'
import UserContext from '../../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Adresse email incorrect')
        .required('Adresse email requise.'),
    password: Yup.string()
        .required('Mot de passe requis')
        .trim("Le mot de passe ne peux pas contenir d'espace")
        .strict(),
})

const initialValues = {
    email: '',
    password: '',
}

export default function Login() {
    const { user, setUser } = useContext(UserContext)
    const { isShowing, toggle } = useModal()
    const [cookies, setCookie] = useCookies()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (user !== null) {
            navigate('/')
        }
    }, [user])

    const handleSubmit = (credentials) => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                if (!res.ok) {
                    res.text().then(
                        (err) => setError(JSON.parse(err)['message']),
                        setLoading(false)
                    )
                }
                return res.json()
            })
            .then((data) => {
                setCookie('token', data.token)
                setUser({
                    userId: data.userId,
                    token: data.token,
                })
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
                setError(
                    'Une erreur est survenue, veuillez réessayer ultérieurement.'
                )
                setLoading(false)
            })
    }

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(credentials) => handleSubmit(credentials)}
            >
                <Form className="form-login">
                    <div className="card w-500">
                        <div className="card-logo">
                            <img src={logo} width="300" />
                        </div>
                        {error && <div className="card-error">{error}</div>}
                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    className="form-label"
                                    htmlFor="password"
                                >
                                    Mot de passe
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="small"
                                    className="text-danger"
                                />
                            </div>
                            <div className="btn-group-inline">
                                <button
                                    type="submit"
                                    className="btn btn-primary mr-4"
                                    disabled={loading}
                                >
                                    {loading ? <Loader /> : 'Connexion'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={toggle}
                                >
                                    Inscription
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
            <Modal isShowing={isShowing} hide={toggle} title={'Inscription'}>
                <RegisterComponent toggle={toggle} />
            </Modal>
        </div>
    )
}
