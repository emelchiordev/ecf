import React, { useEffect, useState } from 'react'
import { Params, useParams, useOutletContext } from 'react-router-dom'
import Button from '../components/Button';
import SectionsApi from '../services/SectionsApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faFloppyDisk
} from "@fortawesome/free-solid-svg-icons";
import SectionEditLoader from './loaders/SectionEditLoader';


const Sections = () => {

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [activePage, setActivePage] = useOutletContext();
    const [success, setSuccess] = useState({ success: false, message: "" })
    const [section, setSection] = useState({ title: "" })
    const [editSection, setEditSection] = useState([])
    const [sections, setSections] = useState([])
    const [updatePage, setUpdatePage] = useState(false)


    useEffect(() => {
        setActivePage(1)
    }, [])
    useEffect(() => {

        SectionsApi.getSectionsFilter(params.id).then(response => {
            if (response.status === 200) {
                setSections(response.data)
                setLoading(true)
            }
        }).catch(e => console.log(e))

        return () => {
            setSections([])


        }
    }, [updatePage])

    const [errorValidation, setErrorValidation] = useState({
        title: ""
    })

    const handleChange = (e) => {
        setSection({ ...section, [e.target.name]: e.target.value })
    }

    const handleChangeEdit = (e) => {
        setEditSection({ ...editSection, [e.target.name]: e.target.value })

    }

    const handleSubmit = () => {
        SectionsApi.createSections({ ...section, course: '/api/courses/' + params.id }).then(response => {
            setUpdatePage(!updatePage)
            setSuccess({ ...success, success: true, message: "La section a bien été créée ! " })

            setSection({ title: "" })
        }).catch(e => console.log(e))
    }

    const handleEdit = (idSection) => {
        SectionsApi.modifySections(idSection, { ...section, title: editSection[idSection] }).then(response => {
            setUpdatePage(!updatePage)
            setSuccess({ ...success, success: true, message: "La section a bien été modifiée ! " })
        }).catch(e => console.log(e))
    }

    const handleRemove = (id) => {
        SectionsApi.removeSection(id).then(response => {
            if (response.status === 204) {
                setUpdatePage(!updatePage)
            }
        }).catch(e => console.log(e))

    }

    return (
        <div>

            <div className="table-responsive">
                {!loading && < SectionEditLoader />}
                {loading &&
                    <table className="table table-hover table-nowrap">
                        <thead className="bgcolor">

                            <tr>
                                <th scope="col">Titre</th>

                                <th scope="col">Action</th>

                            </tr>
                        </thead>

                        <tbody>
                            {sections.map(section => {
                                return (
                                    <tr key={section.id}>
                                        <td>
                                            <div className="input-group mb-3 col">
                                                <input type="text" defaultValue={section.title} value={editSection.key} className="form-control" name={section.id} onChange={handleChangeEdit} placeholder="Prénom" aria-label="lastname" aria-describedby="lastname" />
                                                {errorValidation.lastName && <p className='invalid-feedback d-block'>{errorValidation.lastName}</p>}
                                            </div>
                                        </td>
                                        <td>       <div className='d-flex justify-content-around'>
                                            <span style={{ "cursor": 'pointer' }} onClick={() => handleEdit(section.id)} > <FontAwesomeIcon icon={faFloppyDisk} className="fa-lg" /></span >

                                            <span style={{ "cursor": 'pointer' }}><FontAwesomeIcon icon={faTrashAlt} className="fa-lg" onClick={() => handleRemove(section.id)} /></span>
                                        </div></td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                }
            </div>

            <div>

                <form>
                    <div className='justify-content-between'>
                        <div className="row mt-4 justify-content-center">
                            <div className="col-lg-6">
                                <div className="input-group mb-3" error={errorValidation.title}>
                                    <input type="text" value={section.title} className="form-control" name='title' onChange={handleChange} placeholder="Titre de la section" aria-label="section" aria-describedby="section" />
                                    {errorValidation.title && <p className='invalid-feedback d-block'>{errorValidation.title}</p>}
                                    <Button simple={true} text="AJOUTER" onclick={handleSubmit}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

                {success.success &&
                    <div className="alert alert-success" role="alert">
                        {success.message}
                    </div>

                }

            </div>
        </div>
    )
}

export default Sections