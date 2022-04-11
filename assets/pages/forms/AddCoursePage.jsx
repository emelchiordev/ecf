import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import CoursesApi from '../../services/CoursesApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'


const AddCoursePage = ({ isAuthenticatedStatus }) => {

    const [courses, setCourses] = useState({ title: '', description: '', instructor: '/api/instructors/' + isAuthenticatedStatus.id })
    const [success, setSucess] = useState(false)
    const [sending, setSending] = useState(false)
    const [errorValidation, setErrorValidation] = useState({
        title: "",
        description: ""

    })

    const handleChange = (e) => {
        setCourses({ ...courses, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        setSending(true)
        CoursesApi.createCourse(courses).then(response => {
            if (response.status === 200 || response.status === 201) {
                setSucess(true)
                setSending(false)
                notify()
                setCourses({ ...courses, title: "", description: "" })
            }
        }).catch(error => {
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
            <NavLink to='../mes-cours' className='mt-4 align-self-end pe-auto'><FontAwesomeIcon icon={faCircleArrowLeft} size="1,5x" /> RETOUR</NavLink>
            <Wrapper>

                <h1>Ajouter un cours</h1>

                <form>
                    <div className='justify-content-between'>
                        <div className="row mt-4 justify-content-center">
                            <div className="col-lg-6">
                                <div className="input-group mb-3" error={errorValidation.title}>
                                    <input type="text" value={courses.title} className="form-control" name='title' onChange={handleChange} placeholder="Titre du cours" aria-label="firstname" aria-describedby="firstname" />
                                    {errorValidation.title && <p className='invalid-feedback d-block'>{errorValidation.title}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 justify-content-center">
                            <div className="col-lg-6">
                                <div className="input-group mb-3" error={errorValidation.description}>
                                    <textarea rows="5" value={courses.description} className="form-control shadow-none" name="description" onChange={handleChange} placeholder="Description" aria-label="description" aria-describedby="description" />
                                    {errorValidation.description && <p className='invalid-feedback d-block'>{errorValidation.description}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-2">
                                <Button text="AJOUTER" simple sending={sending} onclick={handleSubmit}></Button>
                            </div>
                        </div>
                        {success &&
                            <div className="alert alert-success" role="alert">
                                Votre cours a bien été créé !
                            </div>
                        }

                    </div>

                </form>


            </Wrapper>

        </div>

    )
}

const Wrapper = styled.div`
margin-top:1rem;
background-color:#fff;
width:100%;
text-align:center;
border-radius:15px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

`

export default AddCoursePage