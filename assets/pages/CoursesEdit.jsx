import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import CoursesApi from '../services/CoursesApi'
import { Params, useParams, useOutletContext } from 'react-router-dom'
import CourseEditLoader from './loaders/CourseEditLoader'
import axios from 'axios'



const CoursesEdit = () => {
    const [activePage, setActivePage] = useOutletContext();
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState({ title: '', description: '' })
    const [success, setSucess] = useState(false)
    const [sending, setSending] = useState(false)
    const [sendingAvatar, setSendingAvatar] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [uriMedia, setUriMedia] = useState("")

    const [errorValidation, setErrorValidation] = useState({
        title: "",
        description: ""

    })

    useEffect(() => {
        setActivePage(0)
        CoursesApi.getCourse(params.id).then(response => {
            setCourses({ ...courses, title: response.data.title, description: response.data.description })
            CoursesApi.getPhoto(response.data.photos).then(res => setAvatar(res.data.contentUrl))
            setLoading(true)
        }).catch(e => console.log(e))



        return () => {
            setSucess([]),
                setSending([]),
                setCourses([])
        }
    }, [])

    const handleChange = (e) => {
        setCourses({ ...courses, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        setSending(true)
        CoursesApi.modifyCourse(params.id, courses).then(response => {
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

    const handleUplaodFile = (e) => {
        setSendingAvatar(true)
        let formData = new FormData()
        formData.append("file", e)
        CoursesApi.createPhoto(formData).then(response => {
            if (response.status == 201) {
                setCourses({ ...courses, photos: response.headers["content-location"] })
                setAvatar(response.data.contentUrl)
                setSendingAvatar(false)
                setSave(false)

            }
        }).catch(e => setSendingAvatar(false))
    }

    return (
        <div>
            {console.log(courses)}
            <h1 className='mt-4'>MODIFIER LE COURS</h1>
            <p className='mt-4'>Cette page vous permet de modifier le titre et la description de ce cours</p>

            {loading && <form className='mt-4'>
                <div className='justify-content-between'>
                    <h5 className='mt-8'>TITRE DU COURS</h5>
                    <div className="row mt-4 justify-content-center">

                        <div className="col-lg-6">

                            <div className="input-group mb-3" error={errorValidation.title}>

                                <input type="text" value={courses.title} className="form-control" name='title' onChange={handleChange} placeholder="Titre du cours" aria-label="firstname" aria-describedby="firstname" />
                                {errorValidation.title && <p className='invalid-feedback d-block'>{errorValidation.title}</p>}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='mt-4'>
                        <h5 className='mt-8'>PHOTO DU COURS</h5>
                        <div className='mt-4 d-flex justify-content-around align-items-center'>

                            <img src={"." + avatar} width="100" height="100" />
                            <input type="file" className="custom-file-upload" onChange={e => handleUplaodFile(e.target.files[0])}
                                id="avatar" name="avatar"
                                accept="image/png, image/jpeg" />
                        </div>
                        {sendingAvatar && <> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span ><span> Upload en cours...</span></>}
                    </div>
                    <hr />
                    <div className="row mt-4 justify-content-center">
                        <h5 className='mt-8'>DESCRIPTION DU COURS</h5>
                        <div className="col-lg-6">
                            <div className="input-group mb-3" error={errorValidation.description}>
                                <textarea rows="5" value={courses.description} className="form-control shadow-none" name="description" onChange={handleChange} placeholder="Description" aria-label="description" aria-describedby="description" />
                                {errorValidation.description && <p className='invalid-feedback d-block'>{errorValidation.description}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center mb-4">
                        <div className="col-2">
                            <Button text="SAUVEGARDER" simple sending={sending} onclick={handleSubmit}></Button>
                        </div>
                    </div>
                    {success &&
                        <div className="alert alert-success" role="alert">
                            Votre cours a bien été modifié !
                        </div>
                    }

                </div>

            </form>
            }
            {
                !loading && <CourseEditLoader />
            }
        </div >


    )
}

const Wrapper = styled.div`
padding:1rem;
margin-top:1rem;
background-color:#fff;
width:100%;
text-align:center;
border-radius:15px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

`

export default CoursesEdit