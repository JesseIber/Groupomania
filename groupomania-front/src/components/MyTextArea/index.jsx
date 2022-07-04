import { useField } from 'formik'

export default function MyTextArea({ label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <>
            <textarea className="form_textarea" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    )
}
