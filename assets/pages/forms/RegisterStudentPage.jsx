import React, { useEffect, useState } from 'react'
import StudentApi from '../../services/StudentApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircleInfo, faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterStudentPage = () => {
    const [sending, setSending] = useState(false)

    const [student, setStudent] = useState({
        roles: ["ROLES_STUDENT"],
        pseudonym: '',
        password: "",
        description: "",
        email: ""
    })

    const [errorValidation, setErrorValidation] = useState({
        pseudonym: "",
        password: "",
        email: ""
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setStudent({ ...student, [name]: value })
    }

    const handleSubmit = () => {
        setSending(true)
        StudentApi.createStudent(student).then(response => {
            if (response.status === 200 || response.status === 201) {
                setSending(false)
                notify()
                setStudent({ ...student, pseudonym: "", password: "", email: "" })
            }
        }).catch(error => {
            setSending(false)
            if (error.response.data['violations']) {

                const apiError = {}
                error.response.data['violations'].map(error => {
                    apiError[error.propertyPath] = error.message
                })
                setErrorValidation(apiError)
            }

        })
    }


    return (
        <div className='container d-flex flex-column align-items-center '>
            <h1>Vous souhaitez suivre une formation ?</h1>
            <form>
                <div className='justify-content-between'>
                    <div className="row">
                        <div className="input-group mb-3 col" error={errorValidation.pseudonym}>
                            <input type="text" value={student.pseudonym} className="form-control" name='pseudonym' onChange={handleChange} placeholder="Pseudonyme" aria-label="pseudonym" aria-describedby="pseudonym" />
                            {errorValidation.pseudonym && <p className='invalid-feedback d-block'>{errorValidation.pseudonym}</p>}
                        </div>
                    </div>


                    <div className="input-group mb-3">
                        <span className="input-group-text" id="email"><FontAwesomeIcon icon={faAt} /></span>
                        <input type="email" value={student.email} className="form-control" name='email' onChange={handleChange} placeholder="Email" aria-label="email" aria-describedby="email" />
                        {errorValidation.email && <p className='invalid-feedback d-block'>{errorValidation.email}</p>}
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="password"><FontAwesomeIcon icon={faKey} /></span>
                        <input type="password" value={student.password} className="form-control" name='password' onChange={handleChange} placeholder="Mot de passe" aria-label="password" aria-describedby="password" />
                        {errorValidation.password && <p className='invalid-feedback d-block'>{errorValidation.password}</p>}

                    </div>

                </div>
                <div>
                    <p>En vous inscrivant, vous acceptez nos conditions générales d'utilisation et notre politique de confidentialité.</p>
                    <p>Vous avez déjà un compte ? </p>
                </div>
            </form >
            <Button text="S'INSCRIRE" simple sending={sending} onclick={handleSubmit}></Button>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default RegisterStudentPage