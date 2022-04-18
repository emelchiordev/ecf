import React, { useEffect, useState } from 'react'
import CardCourse from '../components/CardCourse'
import CoursesApi from '../services/CoursesApi'
import Button from '../components/Button'
import CoursesStudentApi from '../services/CoursesStudentApi'
import StudentApi from '../services/StudentApi'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


const CoursesCatalog = ({ isAuthenticatedStatus, setLessonToStore }) => {

    const [courses, setCourses] = useState([])
    const [modal, setModal] = useState({
        courseId: ""
    })
    const [studentId, setStudentId] = useState("")
    const [search, setSearch] = useState('')
    const [checkBox, setCheckBox] = useState({ inprogress: false, finish: false })
    const [coursesChecked, setCoursesChecked] = useState([])
    const [coursesCopy, setCoursesCopy] = useState([])
    const [isStudent, setIsStudent] = useState(false)
    const [studentLoaded, setStudentLoaded] = useState(false)
    const [coursesLoaded, setCoursesLoaded] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        if (isAuthenticatedStatus) {
            if (isAuthenticatedStatus.roles.includes("ROLES_STUDENT")) {
                setIsStudent(true)
                return () => setIsStudent('')
            }
        }

    }, [])


    useEffect(() => {
        setStudentId(isAuthenticatedStatus.id)
        CoursesApi.getPublishedCourses().then(res => {
            if (res.status === 200) {
                setCourses(res.data)
                setCoursesCopy(res.data)
                setCoursesLoaded(true)
            }
        })
        return () => {
            setCoursesCopy([])
            setCourses([])
        }
    }, [])


    useEffect(() => {
        if (isStudent) {
            StudentApi.getStudent(isAuthenticatedStatus.id).then(res => {
                if (res.status === 200) {
                    const coursesInProgress = (res.data.coursesStudents.filter(course => course.statusProgress === false)).map(element => element.courses)
                    const coursesFinish = (res.data.coursesStudents.filter(course => course.statusProgress === true)).map(element => element.courses)
                    setCoursesChecked({ finish: coursesFinish, inprogress: coursesInProgress })
                    setStudentLoaded(true)

                }
            }).catch(e => console.log(e))

        }

        return () => {
            setCoursesChecked([])
        }

    }, [isStudent])

    const handleFollow = (course) => {

        setModal({ ...modal, courseId: course.id, title: course.title, description: course.description })

    }


    const handleStartFormation = (id) => {
        setSpinner(true)
        CoursesStudentApi.createCourseStudent({ statusProgress: false, students: '/api/students/' + studentId, courses: '/api/courses/' + id }).then(res => {

            setSpinner(false)
            if (res.status === 201) {
                setLessonToStore({ studentId: studentId, coursesId: id })
            }


        }).catch(e => {
            console.log(e)
            if (e.response.status === 422) {
                setSpinner(false)
                toast.info(e.response.data.violations[0].message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
        })
    }


    let filteredCourses = courses.filter(course => course.title.toLowerCase().includes(search.toLocaleLowerCase()))




    const handleChange = e => {
        const value = (e.currentTarget.value)
        setSearch(value)
    }

    const handleCheck = e => {

        switch (e.target.name) {
            case 'inprogress': {
                if (e.target.checked === true) {
                    setCourses(coursesChecked.inprogress)
                    setCheckBox({ inprogress: !checkBox.inprogress, finish: false })
                } else {
                    setCourses(coursesCopy)
                    setCheckBox({ ...checkBox, inprogress: !checkBox.inprogress })
                }
            }
                break;
            case 'finish': {
                if (e.target.checked === true) {
                    setCourses(coursesChecked.finish)
                    setCheckBox({ finish: !checkBox.finish, inprogress: false })
                } else {
                    setCourses(coursesCopy)
                    setCheckBox({ ...checkBox, finish: !checkBox.finish })
                }

            }

            default:
        }

    }

    if (!studentLoaded && !coursesLoaded) {
        return (
            <div className='h-100'>
                <Spinner className="spinner-grow" role="status">


                </Spinner>
            </div>
        )

    } else {
        return (
            <div className='container h-100'>

                <div className='d-flex align-items-center justify-content-between'>
                    <div className="input-group mb-3 mt-5 w-75 ">
                        <input type="text" className="form-control" value={search} onChange={handleChange} placeholder="Rerchercher une formation" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    </div>
                    {isStudent &&

                        !studentLoaded ?

                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        isAuthenticatedStatus.status &&
                        <>
                            <div className="form-check form-check-inline flex-grow-1 ms-2">
                                <input name='finish' className="form-check-input" checked={checkBox.finish} type="checkbox" id="inlineCheckbox1" value="option1" onChange={handleCheck} />
                                <label className="form-check-label" htmlFor="inlineCheckbox1">Formation terminée</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input name='inprogress' className="form-check-input" checked={checkBox.inprogress} type="checkbox" id="inlineCheckbox2" value="option2" onChange={handleCheck} />
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Formation en cours</label>
                            </div>
                        </>

                    }
                </div>

                <h1>Nos formations </h1>
                <hr />

                <div className='d-flex justify-content-evenly flex-wrap'>
                    {filteredCourses.map(course => {
                        return (
                            <CardCourse
                                handleFollow={() => handleFollow(course)}
                                title={course.title}
                                description={course.description}
                                key={course.id}
                                image={course.photos.contentUrl}
                            />

                        )

                    })}
                </div>
                <ToastContainer />



                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content show">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Formation : {modal.title} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p className='mb-5'>{modal.description}</p>
                                {!isAuthenticatedStatus ? <h5 className='text-center mt-5 text-center'> Vous devez être connecté pour suivre cette formation.</h5>
                                    : <h5>Souhaitez-vous commencer cette formation ?</h5>
                                }

                            </div>
                            <div className="modal-footer">
                                {!isAuthenticatedStatus ?
                                    <div className='m-auto'>
                                        <Button simple text="Se connecter" closeModal onclick={() => navigate('/connexion')} />
                                    </div>

                                    : <>
                                        <Button simple alternative={true} text="Fermer" closeModal />
                                        <Button sending={spinner} simple closeModal text="Comencer la formation" onclick={() => handleStartFormation(modal.courseId)} />
                                    </>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Spinner = styled.div`
position: absolute;
left: 50%;
top: 50%;
`

export default CoursesCatalog