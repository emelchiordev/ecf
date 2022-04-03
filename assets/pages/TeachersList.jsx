import React, { useEffect, useState } from 'react'
import FabButton from '../components/FabButton'
import TeachersApi from '../services/TeachersApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InstructorApi from '../services/InstructorApi';
import {
    faTrashAlt,
    faEye,
    faThumbsUp,
    faThumbsDown
} from "@fortawesome/free-solid-svg-icons";

const TeachersList = () => {

    const [teachers, setTeachers] = useState([])
    const [description, setDescription] = useState('')

    useEffect(() => {
        TeachersApi.getTeachers().then(data => setTeachers(data.data))

        return (() => {
            setTeachers('')
        })

    }, [])

    const handleRemove = (id) => {
        const copyTeachers = [...teachers]
        setTeachers(teachers.filter(teachers => teachers.id !== id))
        InstructorApi.deleteInstructor(id).then(response => console.log(response.status)).catch(error => setTeachers(copyTeachers))
    }

    const handleSetAccountStatus = (id, value) => {
        const copyTeachers = [...teachers]
        let teacherCopy = [...teachers]
        const indexTeacherToModify = teachers.findIndex(teachers => teachers.id == id)
        const valueTeacherToModify = teachers.find(teachers => teachers.id == id)
        const teacherModify = { ...valueTeacherToModify, accountValidate: value }
        teacherCopy[indexTeacherToModify] = teacherModify
        setTeachers(teacherCopy)
        InstructorApi.setAccountStatus(id, { accountValidate: value }).then().catch(error => setTeachers(copyTeachers))
    }


    return (<>

        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h5>LES FORMATEURS</h5>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-nowrap ">
                        <thead className="bgcolor">
                            <tr>
                                <th scope="col">NOM</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">STATUS DU COMPTE</th>
                                <th scope="col">Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map(teacher => {
                                return (
                                    <tr key={teacher.id}>
                                        <td > <img alt="..." src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar-sm rounded-circle me-2" /> <a className="text-heading font-semibold" href="#"> {teacher.firstName} {teacher.lastName}</a> </td>
                                        <td> <span>{teacher.email}</span> </td>
                                        <td > <span className={teacher.accountValidate ? "badge bg-soft-success text-success" : "badge bg-soft-warning text-warning"}>{teacher.accountValidate ? "Validé" : "Non confirmé"}</span> </td>
                                        <td>
                                            <div className='d-flex justify-content-around'>
                                                <span><FontAwesomeIcon icon={faTrashAlt} className="fa-lg" onClick={() => handleRemove(teacher.id)} /></span>
                                                <span onClick={() => setDescription(teacher.description)} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"> <FontAwesomeIcon icon={faEye} className="fa-lg" /></span >
                                                {teacher.accountValidate == false ? <span onClick={() => handleSetAccountStatus(teacher.id, true)} > <FontAwesomeIcon icon={faThumbsUp} className="fa-lg" /></span> : <span onClick={() => handleSetAccountStatus(teacher.id, false)}> <FontAwesomeIcon icon={faThumbsDown} className="fa-lg" /></span>}
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
                            {description}
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <FabButton handleClick={() => useNavigate("ajouter")} />
    </>
    )
}

export default TeachersList