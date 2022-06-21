import { Formik, Field, Form, ErrorMessage } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
    signup_email: Yup.string()
        .email('Adresse email incorrect')
        .required('Adresse email requise'),
    signup_password: Yup.string()
        .required('Mot de passe requis')
        .min(6, 'Le mot de passe doit contenir au minimum 6 caractères.')
        .max(
            22,
            'Le mot de passe est trop grand, il doit être inférieur à 22 caractères'
        )
        .trim("Le mot de passe ne peux pas contenir d'espace"),
    confirmPassword: Yup.string()
        .required('La confirmation du mot de passe est obligatoire')
        .oneOf(
            [Yup.ref('signup_password'), null],
            'Le mot de passe de confirmation ne correspond pas.'
        ),
})

const initialValues = {
    signup_email: '',
    signup_password: '',
    confirmPassword: '',
}

export default function Register({ toggle }) {
    const [error, setError] = useState(null)
    const handleSubmit = (values) => {
        fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        })
            .then((res) => {
                if (!res.ok) {
                    res.text().then((err) => setError(err))
                } else {
                    return console.log(res)
                }
            })
            .catch(() => {
                setError(
                    'Une erreur est survenue, veuillez réessayer ultérieurement.'
                )
            })
    }
    return (
        <>
            {error && <div className="card-error">{error}</div>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
                <Form id="signup_form">
                    <div className="form-group">
                        <label htmlFor="signup_email" className="form-label">
                            Email
                        </label>
                        <Field
                            type="email"
                            id="signup_email"
                            name="signup_email"
                            className="form-input"
                        />
                        <ErrorMessage
                            name="signup_email"
                            component="small"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="signup_password" className="form-label">
                            Mot de passe
                        </label>
                        <Field
                            type="password"
                            id="signup_password"
                            name="signup_password"
                            className="form-input"
                        />
                        <ErrorMessage
                            name="signup_password"
                            component="small"
                            className="text-danger"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirmation du mot de passe
                        </label>
                        <Field
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-input"
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            component="small"
                            className="text-danger"
                        />
                    </div>
                    <div className="btn-group-inline justify-right">
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-4"
                            onClick={toggle}
                        >
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Inscription
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}
