import React, { useState } from 'react'
import StudentApi from '../../services/StudentApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

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
                toast.success('Votre compte a bien été créé', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
        <div className='container d-flex flex-column align-items-center h-75 w-50'>
            <h1 className='mt-10'>Vous souhaitez suivre une formation ?</h1>
            <Wrapper>

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
                    <div className='mt-10 text-center'>
                        <p>En vous inscrivant, vous acceptez nos conditions générales d'utilisation et notre politique de confidentialité.</p>

                        <div className="mt-10">
                            <NavLink to='/connexion'>Vous avez déjà un compte ? </NavLink>
                        </div>
                    </div>
                </form >

                <div className="form-group align-self-center w-25  m-auto mt-5">
                    <Button text="S'INSCRIRE" simple sending={sending} onclick={handleSubmit}></Button>
                </div>

                <ToastContainer

                />
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
margin-top:2rem;
background-color:#fff;
padding:2rem;
border-radius:15px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

export default RegisterStudentPage