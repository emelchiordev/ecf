import React, { useState, useEffect } from 'react'
import FabButton from '../components/FabButton'
import CoursesApi from '../services/CoursesApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrashAlt,
    faEye
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const CoursesList = () => {

    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    useEffect(() => {
        CoursesApi.getCourses().then(response => setCourses(response.data)).catch(e => console.log(e))

        return () => {
            setCourses([])
        }
    }, [])

    const handleRemove = (id) => {
        const copyCourses = [...courses]
        setCourses(courses.filter(courses => courses.id !== id))
        CoursesApi.removeCourse(id).then(response => console.log(response.status)).catch(error => setCourses(copyCourses))
    }

    const handleEditCourse = (id) => {
        navigate('/cours/' + id + '/editer')
    }

    return (
        <div className="container">
            <div className="card" style={{ "marginTop": "1rem" }}>
                <div className="card-header">
                    <h5>Mes cours</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-nowrap ">
                        <thead className="bgcolor">
                            <tr>
                                <th scope="col">Titre</th>
                                <th scope="col">Description</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => {
                                return (
                                    <tr key={course.id}>
                                        <td>{course.title}</td>
                                        <td>{course.description.substring(0, 30) + '...'}</td>
                                        <td key={course.id}>
                                            <div className='d-flex justify-content-around'>
                                                <span style={{ "cursor": 'pointer' }} onClick={() => handleEditCourse(course.id)} > <FontAwesomeIcon icon={faEye} className="fa-lg" /></span >

                                                <span style={{ "cursor": 'pointer' }}><FontAwesomeIcon icon={faTrashAlt} className="fa-lg" onClick={() => handleRemove(course.id)} /></span>
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

export default CoursesList