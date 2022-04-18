import React, { useState, useEffect } from 'react'
import FabButton from '../components/FabButton'
import CoursesApi from '../services/CoursesApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faEye,
    faCheck,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const CoursesList = ({ isAuthenticatedStatus }) => {

    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [accountValide, setAccountValide] = useState(false)
    const [reloadPage, setReloadPage] = useState(false)


    useEffect(() => {
        CoursesApi.getCoursesInstructor(isAuthenticatedStatus.id).then(response => setCourses(response.data)).catch(e => console.log(e))
        return () => {
            setCourses([])
        }
    }, [reloadPage])



    const handleRemove = (id) => {
        const copyCourses = [...courses]
        setCourses(courses.filter(courses => courses.id !== id))
        CoursesApi.removeCourse(id).then(response => console.log(response.status)).catch(error => setCourses(copyCourses))
    }

    useEffect(() => {
        if (isAuthenticatedStatus.roles[0] === "ROLES_INSTRUCTORS" && isAuthenticatedStatus.accountValidate === false) {
            setAccountValide(false)
        } else {
            setAccountValide(true)
        }
    })






    const handlePublish = (id) => {
        CoursesApi.modifyCourse(id, { published: true }).then(res => {
            setReloadPage(!reloadPage)
            console.log(res)
        }).catch(error => {
            setReloadPage(!reloadPage)
            console.log(error)
        })
    }

    const handleRemovePublish = (id) => {
        CoursesApi.modifyCourse(id, { published: false }).then(res => {
            setReloadPage(!reloadPage)
            console.log(res)
        }).catch(error => {
            setReloadPage(!reloadPage)
            console.log(error)
        })
    }

    console.log(isAuthenticatedStatus)

    const handleEditCourse = (id) => {
        navigate('/cours/' + id + '/editer')
    }

    if (accountValide === false) {
        return (

            <div className="container h-75">
                <div className="card d-flex justify-content-center" style={{ "marginTop": "1rem", 'height': '100%', 'padding': '10px' }}>
                    <h3 className=' text-center'>Votre compte n'a pas encore été validé</h3>
                    <p className='text-center mt-10'>Vous ne pouvez pas créer de cours tant que votre compte n'a pas été validé par un administrateur</p>
                    <p className=' text-center'>Vous recevrez un mail de confirmation, une fois que votre compte sera validé</p>

                </div>
            </div>
        )
    } else {
        return (
            <div className="container h-75">
                <div className="card" style={{ "marginTop": "1rem" }}>
                    <div className="card-header">
                        <h5>Mes cours</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap ">
                            <thead className="bgcolor">
                                <tr>
                                    <th className='text-center' scope="col">Titre</th>
                                    <th className='text-center' scope="col">Description</th>
                                    <th className='text-center' scope="col">Etat</th>
                                    <th className='text-center' scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>

                                {courses.map(course => {
                                    return (
                                        <tr key={course.id}>
                                            <td className='text-center'>{course.title}</td>
                                            <td className='text-center'>{course.description.substring(0, 30) + '...'}</td>
                                            <td className='text-center'>{course.published ? <span class="badge rounded-pill bg-info">Publié</span> : <span class="badge rounded-pill bg-secondary">Non Publié</span>}</td>
                                            <td key={course.id}>
                                                <div className='d-flex justify-content-around'>
                                                    <span style={{ "cursor": 'pointer' }} onClick={() => handleEditCourse(course.id)} > <FontAwesomeIcon icon={faEye} className="fa-lg" /></span >

                                                    <span style={{ "cursor": 'pointer' }}><FontAwesomeIcon icon={faTrashAlt} className="fa-lg" onClick={() => handleRemove(course.id)} /></span>
                                                    <span style={{ "cursor": 'pointer' }}><FontAwesomeIcon icon={faCheck} name="publish" className="fa-lg" onClick={() => handlePublish(course.id)} /></span>
                                                    <span style={{ "cursor": 'pointer' }}><FontAwesomeIcon icon={faXmark} name='depublish' className="fa-lg" onClick={() => handleRemovePublish(course.id)} /></span>


                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Description</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                            </div>

                        </div>
                    </div>
                </div>
                <FabButton handleClick={() => navigate("/ajouter-cours")} />



            </div >

        )
    }
}

export default CoursesList