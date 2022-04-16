import React, { useEffect, useState } from 'react'
import CardCourse from '../components/CardCourse'
import CoursesApi from '../services/CoursesApi'
import Button from '../components/Button'
import CoursesStudentApi from '../services/CoursesStudentApi'
import StudentApi from '../services/StudentApi'
import styled from 'styled-components'


const CoursesCatalog = ({ isAuthenticatedStatus }) => {

    const [courses, setCourses] = useState([])
    const [modal, setModal] = useState({
        courseId: ""
    })
    const [studentId, setStudentId] = useState("")
    const [search, setSearch] = useState('')
    const [checkBox, setCheckBox] = useState({ inprogress: false, finish: false })
    const [coursesChecked, setCoursesChecked] = useState([])
    const [coursesCopy, setCoursesCopy] = useState([])
    const [pageLoaded, setPageLoaded] = useState({ courses: false, student: false })



    useEffect(() => {
        setStudentId(isAuthenticatedStatus.id)
        CoursesApi.getCourses().then(res => {
            if (res.status === 200) {
                setCourses(res.data)
                setCoursesCopy(res.data)
                setPageLoaded({ ...pageLoaded, courses: true })
            }
        })
        return () => {
            setCoursesCopy([])
            setPageLoaded({})
            setCourses([])
        }
    }, [])




    useEffect(() => {
        StudentApi.getStudent(isAuthenticatedStatus.id).then(res => {
            if (res.status === 200) {
                const coursesInProgress = (res.data.coursesStudents.filter(course => course.statusProgress === false)).map(element => element.courses)
                const coursesFinish = (res.data.coursesStudents.filter(course => course.statusProgress === true)).map(element => element.courses)
                setCoursesChecked({ finish: coursesFinish, inprogress: coursesInProgress })
                setPageLoaded({ ...pageLoaded, student: true })

            }
        }).catch(e => console.log(e))

        return () => {
            setPageLoaded({})
            setCoursesChecked([])
        }

    }, [])

    const handleFollow = (course) => {
        setModal({ ...modal, courseId: course.id, title: course.title })
    }

    const handleStartFormation = (id) => {
        CoursesStudentApi.createCourseStudent({ statusProgress: false, students: '/api/students/' + studentId, courses: '/api/courses/' + id })
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

    if (!pageLoaded.courses && !pageLoaded.student) {
        return (
            <Spinner className="spinner-grow" role="status">

            </Spinner>
        )

    } else {
        return (
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className="input-group mb-3 mt-5 w-75 ">
                        <input type="text" className="form-control" value={search} onChange={handleChange} placeholder="Rerchercher une formation" aria-label="Recipient's username" aria-describedby="basic-addon2" />

                    </div>
                    <div className="form-check form-check-inline flex-grow-1 ms-2">
                        <input name='finish' className="form-check-input" checked={checkBox.finish} type="checkbox" id="inlineCheckbox1" value="option1" onChange={handleCheck} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Formation terminée</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input name='inprogress' className="form-check-input" checked={checkBox.inprogress} type="checkbox" id="inlineCheckbox2" value="option2" onChange={handleCheck} />
                        <label className="form-check-label" htmlFor="inlineCheckbox2">Formation en cours</label>
                    </div>
                </div>

                <h1>Nos formations</h1>
                <hr />

                <div className='d-flex justify-content-evenly flex-wrap'>
                    {filteredCourses.map(course => {
                        return (
                            <CardCourse
                                handleFollow={() => handleFollow(course)}
                                title={course.title}
                                key={course.id}
                                description={course.description}
                                image={course.photos.contentUrl}
                            />

                        )

                    })}
                </div>


                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content show">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Formation : {modal.title} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5>Souhaitez-vous commencer cette formation ?</h5>
                            </div>
                            <div className="modal-footer">
                                <Button simple alternative={true} text="Fermer" closeModal />
                                <Button simple text="Comencer la formation" onclick={() => handleStartFormation(modal.courseId)} />
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