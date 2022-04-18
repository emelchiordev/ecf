import React, { useState } from 'react'
import InstructorApi from '../../services/InstructorApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCircleInfo, faAt, faKey } from '@fortawesome/free-solid-svg-icons'
import Button from '../../components/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import styled from 'styled-components'

const RegisterTeacherPage = () => {

    const [sending, setSending] = useState(false)

    const [instructor, setInstructor] = useState({
        accountValidate: true,
        roles: ["ROLES_INSTRUCTORS"],
        avatar: "/api/media_objects/6",
        firstName: "",
        lastName: "",
        password: "",
        description: "",
        email: ""
    })

    const [errorValidation, setErrorValidation] = useState({
        firstName: "",
        lastName: "",
        password: "",
        description: "",
        email: ""
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setInstructor({ ...instructor, [name]: value })
    }

    const handleSubmit = () => {
        setSending(true)
        InstructorApi.createInstructor(instructor).then(response => {
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
                setInstructor({ ...instructor, firstName: "", lastName: "", password: "", description: "", email: "" })
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
            <h1 className='mt-10'>Vous souhaitez devenir formateur ?</h1>
            <Wrapper>
                <form>
                    <div className='justify-content-between'>
                        <div className="row">
                            <div className="input-group mb-3 col" error={errorValidation.firstName}>
                                <input type="text" value={instructor.firstName} className="form-control" name='firstName' onChange={handleChange} placeholder="Nom" aria-label="firstname" aria-describedby="firstname" />
                                {errorValidation.firstName && <p className='invalid-feedback d-block'>{errorValidation.firstName}</p>}
                            </div>

                            <div className="input-group mb-3 col">
                                <input type="text" value={instructor.lastName} className="form-control" name="lastName" onChange={handleChange} placeholder="Prénom" aria-label="lastname" aria-describedby="lastname" />
                                {errorValidation.lastName && <p className='invalid-feedback d-block'>{errorValidation.lastName}</p>}
                            </div>

                        </div>

                        <div className="input-group mb-3">
                            <textarea rows="5" value={instructor.description} className="form-control" name="description" onChange={handleChange} placeholder="Description" aria-label="description" aria-describedby="description" />
                            {errorValidation.description && <p className='invalid-feedback d-block'>{errorValidation.description}</p>}
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="email"><FontAwesomeIcon icon={faAt} /></span>
                            <input type="email" value={instructor.email} className="form-control" name='email' onChange={handleChange} placeholder="Email" aria-label="email" aria-describedby="email" />
                            {errorValidation.email && <p className='invalid-feedback d-block'>{errorValidation.email}</p>}
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" id="password"><FontAwesomeIcon icon={faKey} /></span>
                            <input type="password" value={instructor.password} className="form-control" name='password' onChange={handleChange} placeholder="Mot de passe" aria-label="password" aria-describedby="password" />
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
            </Wrapper>
            <ToastContainer

            />
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

export default RegisterTeacherPage