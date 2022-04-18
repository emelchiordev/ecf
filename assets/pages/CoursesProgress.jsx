import React, { Fragment, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import CoursesApi from '../services/CoursesApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'
import LessonStudentApi from '../services/LessonStudentApi'
import StudentApi from '../services/StudentApi'
import { ToastContainer, toast } from 'react-toastify';
import CoursesStudentApi from '../services/CoursesStudentApi'
import 'react-toastify/dist/ReactToastify.css';

const CoursesProgress = ({ isAuthenticatedStatus, studentStore, setStudentToStore, setCourseToStore, setLessonToStore, setPercentageStore }) => {

    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [sending, setSending] = useState(false)
    const [lesson, setLesson] = useState({})
    const [lessonStatus, setLessonStatus] = useState([])
    const [reloadStudent, setReloadStudent] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [successMessage, setSuccessMessage] = useState(false)
    const [nbLesson, setNbLesson] = useState(0)
    const [lessonFlat, setLessonFlat] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const [courseStatus, setCourseStatus] = useState(false)
    const [studentCourse, setStudentCourse] = useState([])

    useEffect(() => {
        if (isAuthenticatedStatus && isAuthenticatedStatus.roles.includes('ROLES_STUDENT')) {
            StudentApi.getStudent(isAuthenticatedStatus.id).then(res => {
                if (res.status === 200) {
                    setStudentCourse(res.data.coursesStudents)
                    setStudentToStore(res.data)
                }
            })
        }

    }, [reloadStudent])


    useEffect(() => {
        if (studentStore.lessonStudents !== undefined) {

            let lessonFinish = []
            studentStore.lessonStudents.forEach(element => lessonFinish = [...lessonFinish, element.lesson.id])
            setLessonStatus(lessonFinish)
            //   setLessonToStore(lessonFinish)
            if (lessonFlat !== []) {
                const lessonId = lessonFlat.map(lesson => lesson.id)
                const newArray = lessonFinish.filter(elt => lessonId.includes(elt))
                setPercentage((newArray.length * 100) / lessonId.length)
                setPercentageStore((newArray.length * 100) / lessonId.length)
            }
        }

        return () => {
            //    setCurrentPage(0)
            setLessonStatus([])
        }


    }, [studentStore, courses])

    useEffect(() => {
        setLoading(true)
        CoursesApi.getCourse(params.id).then(res => {
            if (res.status === 200) {

                setLesson(res.data.section[0].lessons[0])

                // gestion de la pagination
                let incrementPage = 0
                let lessonLength = 0
                let lessonArray = res.data.section.flatMap(element => element.lessons)
                res.data.section.map(element => lessonLength += element.lessons.length)
                setLessonFlat(lessonArray)
                setNbLesson(lessonLength)
                setCourseToStore(res.data)
                setCourses(res.data)
                setLoading(false)
            }

        })
        return () => {
            setCurrentPage(0)
            setCourses([])
        }
    }, [params])

    const handleLesson = (lesson) => {
        setCurrentPage(parseInt(Object.keys(lessonFlat).find(k => lessonFlat[k] === lesson)))
        setLesson(lesson)
    }

    useEffect(() => {
        if (studentStore.coursesStudents !== undefined) {
            const studenterFilterCoures = studentStore.coursesStudents.filter(elt => elt.courses.id == params.id)
            console.log()
            setCourseStatus(studenterFilterCoures[0].statusProgress)

            if (percentage === 100 && studenterFilterCoures[0].statusProgress == false) {
                CoursesStudentApi.setCoursesStatus({ statusProgress: true }, studenterFilterCoures[0].id).then(res => {

                    toast.success('Félicitation ! Vous avez terminé le cours', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
                ).catch(e => console.log(e))
            }

        }




    }, [percentage])

    const handleValideLesson = () => {
        setSending(true)
        LessonStudentApi.setValideLesson({ statusLesson: true, lesson: "/api/lessons/" + lesson.id, student: "/api/students/" + isAuthenticatedStatus.id }).then(res => {
            if (res.status === 201) {
                setSending(false)
                toast.success('Bravo ! Votre leçon a bien été validée', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setReloadStudent(!reloadStudent)
            }

        }).catch(e => {
            if (e.response.status === 422) {
                setSending(false)

                toast.warn('Cette leçon a déjà été validée', {
                    position: "bottom-center",
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

    const handleStartCourses = (coursesId) => {
        navigate("/suivi-cours/" + isAuthenticatedStatus.id + "/" + coursesId.courses.id)
    }

    const handlePagination = (nb) => {
        if (nb === (+1) && currentPage + (nb) === nbLesson) {
            return
        }
        if (nb === (-1) && currentPage + (nb) < 0) {
            return
        }

        setLesson(lessonFlat[currentPage + (nb)])
        setCurrentPage(currentPage + (nb))
    }

    if (loading) {

        return (
            <div className='h-100'>
                <Spinner className="spinner-grow" role="status">

                </Spinner>
            </div>
        )
    } else {
        return (


            <div className='d-flex'>
                {console.log(currentPage)}

                <Wrapper className='d-none d-lg-block' style={{ "color": "#FFFFFF" }}>
                    <div>
                        <Curves className='d-flex flex-column align-items-center justify-content-center position-relative'>
                            <div className='mt-2'>{courses.title}</div>
                            <div className='display-5'>{percentage} %</div>

                        </Curves>


                        <div> <span>Formation : {courses.title} </span></div>
                        <div>{courses.section.map(section => {
                            return (<ul className='mt-10' key={section.id}><h5>{section.title}</h5>

                                {section.lessons.map(lesson => {
                                    return (<li className='mt-4 ms-3' key={lesson.id}>
                                        <a className='link' onClick={() => handleLesson(lesson)}><FontAwesomeIcon icon={faSquareCheck} size="1x" /> {lessonStatus.includes(lesson.id) ? <del>{lesson.title}</del> : lesson.title}</a>
                                    </li>)
                                })}
                            </ul>)
                        })}</div>

                    </div>
                    <div>
                    </div>
                </Wrapper>
                <Wrapper2 className='d-flex flex-column align-items-center'>
                    <div className='d-flex w-100 justify-content-between'>
                        {currentPage === 0 ? <span></span> : <a onClick={() => handlePagination(-1)} className='mt-4 align-self-start pe-auto'><FontAwesomeIcon icon={faCircleArrowLeft} size="1x" /> Leçon précédente</a>
                        }
                        {currentPage === nbLesson - 1 ? <span></span> : <a onClick={() => handlePagination(+1)} className='mt-4 align-self-end pe-auto'><FontAwesomeIcon icon={faCircleArrowRight} size="1x" /> Leçon suivante</a>

                        }
                    </div>


                    <h1>{lesson.title}</h1>
                    <iframe
                        className='mt-5'
                        width="800"
                        height="500"
                        src={lesson.video}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>

                    </iframe>
                    <div className='container mt-5'>
                        <div dangerouslySetInnerHTML={{ __html: lesson.description }} ></div>
                    </div>
                    {errorMessage && <div className="alert alert-warning mt-5" role="alert">
                        Vous avez déjà validé cette leçon
                    </div>}

                    {successMessage && <div className="alert alert-success" role="alert">
                        Votre leçon a été validée
                    </div>
                    }
                    <div className='mt-5'>
                        <Button sending={sending} className='align-self-end' simple text="Valider la leçon" onclick={handleValideLesson} />
                    </div>

                    <ToastContainer />
                </Wrapper2>


                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
                    <div className="offcanvas-header">
                        <ButtonNav className='me-4'>

                            <div className="btn-group">
                                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    MES FORMATIONS
                                </button>
                                <ul className="dropdown-menu">
                                    {studentCourse && studentCourse.map(student => {
                                        return (
                                            <li key={Math.random()}><a className="dropdown-item  nav-link" data-bs-toggle="offcanvas" onClick={() => handleStartCourses(student)}>{student.courses.title}</a></li>
                                        )
                                    })
                                    }
                                </ul>
                            </div>
                        </ButtonNav>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div className="offcanvas-body">

                        <Wrapper3 className='' style={{ "color": "#FFFFFF" }}>

                            <div>
                                <Curves className='d-flex flex-column align-items-center justify-content-center position-relative'>
                                    <div className='mt-2'>{courses.title}</div>
                                    <div className='display-5'>{percentage} %</div>

                                </Curves>



                                <div> <span>Formation : {courses.title} </span></div>
                                <div>{courses.section.map(section => {
                                    return (<ul className='mt-10' key={section.id}><h5>{section.title}</h5>

                                        {section.lessons.map(lesson => {
                                            return (<li className='mt-4 ms-3' key={lesson.id}>
                                                <a className='link ' data-bs-toggle="offcanvas" onClick={() => handleLesson(lesson)}><FontAwesomeIcon icon={faSquareCheck} size="1x" /> {lessonStatus.includes(lesson.id) ? <del>{lesson.title}</del> : lesson.title}</a>
                                            </li>)
                                        })}
                                    </ul>)
                                })}</div>

                            </div>
                            <div>
                            </div>
                        </Wrapper3>
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

const ButtonNav = styled.span`
cursor:pointer;
color:#364958;
&:hover {
    color: #67C5AB;
  }
`
const Curves = styled.div`
display: block;
box-sizing: border-box;
height: 200px;
background-color: #0ea47a;
clip-path: ellipse(75% 100% at 65% 0%);
`


const Wrapper = styled.div`
width:350px;
height:100%;
box-shadow: 3px 0px 14px -6px rgba(0,0,0,0.83);
background-color:#fff;
`

const Wrapper3 = styled.div`
width:100%;
height:100%;
background-color:#fff;
`
const Wrapper2 = styled.div`
background-color:#fff;
width:100%;
box-shadow: 3px 0px 14px -6px rgba(0,0,0,0.83);
border-radius:10px;
padding:2rem;
margin:2rem;
`

export default CoursesProgress