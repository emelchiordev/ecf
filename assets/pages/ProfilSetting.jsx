import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import Button from '../components/Button'
import InstructorApi from '../services/InstructorApi'
import FormData from 'form-data';
import TeachersApi from '../services/TeachersApi'


const ProfilSetting = ({ isAuthenticatedStatus }) => {

    const [instructor, setInstructor] = useState({ firstName: '', lastName: '', description: '' })
    const [errorValidation, setErrorValidation] = useState({
        firstName: "",
        lastName: "",
        password: "",
        description: "",
        email: ""
    })
    const [sending, setSending] = useState(false)
    const [uriMedia, setUriMedia] = useState(false)
    const [save, setSave] = useState(false)
    const [saveProfil, setSaveProfil] = useState(false)
    useEffect(() => {
        TeachersApi.getTeacher(isAuthenticatedStatus.id).then(response => setInstructor({ ...instructor, firstName: response.data.firstName, description: response.data.description, lastName: response.data.lastName }))
    }, [])
    const [avatar, setAvatar] = useState("/avatar/" + isAuthenticatedStatus.avatar)

    const handleChange = (e) => {
        setInstructor({ ...instructor, [e.target.name]: e.target.value })
    }

    const handleUplaodFile = (e) => {
        setSending(true)
        let formData = new FormData()
        formData.append("file", e)
        InstructorApi.createAvatar(formData).then(response => {
            if (response.status == 201) {
                setUriMedia(response.headers["content-location"])
                setSending(false)
                setSave(false)
                setAvatar(response.data.contentUrl)
            }
        }).catch(e => setSending(false))
    }

    const handleSave = () => {
        if (uriMedia == "") {

        } else {
            InstructorApi.modifyInstructor(isAuthenticatedStatus.id, { 'avatar': uriMedia }).then(response => setSave(true)).catch(e => setSave(false))
        }
    }

    const handleSaveProfil = () => {
        InstructorApi.modifyInstructor(isAuthenticatedStatus.id, instructor).then(response => {
            if (response.status === 200) {
                setSaveProfil(true)
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
        <div >
            <div className="container">
                <div className="row justify-content-between align-items-stretch">
                    <CardWrapper className='col-lg-4 align-self-start'>
                        <h2>PHOTO DE PROFIL</h2>
                        <p>Ajoutez votre photo pour que l'on vous reconnaisse plus facilement</p>
                        <div className='d-flex justify-content-center mt-4'>
                            <Avatar src={"http://localhost:8000/" + avatar} size="175" round={true} color="#364958" />

                        </div>
                        <div className='mt-4'>
                            <form>

                                <input type="file" className="custom-file-upload" onChange={e => handleUplaodFile(e.target.files[0])}
                                    id="avatar" name="avatar"
                                    accept="image/png, image/jpeg" />
                            </form>
                            {sending && <> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span ><span> Upload en cours...</span></>}
                        </div>
                        <div className="d-flex mt-4 justify-content-center" >
                            <Button onclick={handleSave} simple text="SAUVEGARDER" />
                        </div>
                        {save && <div className="alert alert-success mt-4" role="alert">
                            Votre photo a bien été sauvegardée ! Pour actualiser votre profil, merci de vous reconnectez
                        </div>}
                    </CardWrapper>
                    <CardWrapper className='col-lg-7'>
                        <h2>INFORMATIONS PERSONNELLES</h2>
                        <p>Vous pouvez modifier vos informations personnelles ici</p>
                        <div className='mt-4 col-md-5 col-lg-7' >
                            <p>Nom</p>
                            <div className="input-group mb-3 col-2" >
                                <input type="text" value={instructor.firstName} className="form-control" name='firstName' onChange={handleChange} placeholder="Nom" aria-label="firstname" aria-describedby="firstname" />
                                {errorValidation.firstName && <p className='invalid-feedback d-block'>{errorValidation.firstName}</p>}

                            </div>
                            <p>Prénom</p>
                            <div className="input-group mb-3 col">
                                <input type="text" value={instructor.lastName} className="form-control" name="lastName" onChange={handleChange} placeholder="Prénom" aria-label="lastname" aria-describedby="lastname" />
                                {errorValidation.lastName && <p className='invalid-feedback d-block'>{errorValidation.lastName}</p>}

                            </div>

                        </div>
                        <p>Description</p>
                        <div className="input-group mb-3">
                            <textarea rows="5" value={instructor.description} className="form-control" name="description" onChange={handleChange} placeholder="Description" aria-label="description" aria-describedby="description" />
                            {errorValidation.description && <p className='invalid-feedback d-block'>{errorValidation.description}</p>}

                        </div>
                        <div className="d-flex mt-4 justify-content-center" >

                            <Button onclick={handleSaveProfil} simple text="SAUVEGARDER" />

                        </div>
                        {saveProfil && <div className="alert alert-success mt-4" role="alert">
                            Votre profil a bien été sauvegardée !
                        </div>}
                    </CardWrapper>
                </div>
            </div >

        </div >
    )
}

const CardWrapper = styled.div`
margin-top:1rem;
background-color:#FFF;
border-radius:7px;
box-shadow: 1px 1px 1px #999;
padding:1rem;
`

export default ProfilSetting