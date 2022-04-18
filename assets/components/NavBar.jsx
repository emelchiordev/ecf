import React, { useState, useEffect } from 'react'
import logo from '../styles/img/ecoit.jpg'
import Button from './Button'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Authenticated from '../services/Authenticated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears, faSquareCheck, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import Avatar from 'react-avatar';
import StudentApi from '../services/StudentApi';
import Logo from './Logo';




const NavBar = ({ isAuthenticatedStatus, studentStore, setStudentToStore, courseStore, lessonStatusStore, percentageStore, setLessonToStore, lessonStore }) => {

    const [studentCourse, setStudentCourse] = useState([])
    const [courses, setCourses] = useState([])
    const [lessonStatus, setLessonStatus] = useState([])
    const [percentage, setPercentage] = useState(0)

    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticatedStatus && isAuthenticatedStatus.roles.includes('ROLES_STUDENT')) {
            StudentApi.getStudent(isAuthenticatedStatus.id).then(res => {
                if (res.status === 200) {
                    setStudentCourse(res.data.coursesStudents)
                    setStudentToStore(res.data)
                    console.log(lessonStore)
                    if (lessonStore.length !== 0) {
                        navigate('/suivi-cours/' + lessonStore.payload.studentId + '/' + lessonStore.payload.coursesId)
                    }
                }
            })
        }

        return () => setStudentCourse([])
    }, [isAuthenticatedStatus, lessonStore])

    useEffect(() => {
        setCourses(courseStore)
        setLessonStatus(lessonStatusStore)
        setPercentage(percentageStore)

    }, [courseStore, lessonStatusStore, percentageStore])



    const handleConnect = () => {
        navigate("/connexion");
    }

    const handleProfil = () => {
        navigate("/mon-profil");
    }
    const handleDisconnect = () => {
        Authenticated.expirateToken();
        navigate("../", { replace: true });
    }

    const handleStudent = () => {
        navigate("/inscription-etudiant")
    }

    const handleStartCourses = (coursesId) => {
        navigate("/inscription-etudiant")
        navigate("/suivi-cours/" + isAuthenticatedStatus.id + "/" + coursesId.courses.id)
    }

    const handleLesson = (lesson) => {
        setLessonToStore(lesson)
    }

    return (


        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="185" height="47" alt="logo ECO IT" />
                    </a>
                    <div className="ms-auto">

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target={location.pathname.includes('suivi-cours') ? "#offcanvasWithBackdrop" : '#offcanvasExample'} aria-controls="offcanvasExample" >
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <div className="collapse navbar-collapse " id="navbarToggleExternalContent">
                            {!isAuthenticatedStatus.status && <>
                                <NavLink className='me-5' to='/catalogue'>CATALOGUE DES FORMATIONS</NavLink>
                                <NavLink className='me-5' to='/inscription-formateur'>DEVENIR INSTRUCTEUR ?</NavLink>
                                <Button onclick={handleStudent} alternative text="S'INSCRIRE" />
                            </>
                            }
                            {isAuthenticatedStatus.status === true ? ((isAuthenticatedStatus.roles.includes("administrator") || isAuthenticatedStatus.roles.includes("ROLES_STUDENT") || isAuthenticatedStatus.roles.includes("ROLES_INSTRUCTORS")) &&
                                <>
                                    {isAuthenticatedStatus.roles.includes("administrator") &&
                                        <ButtonNav className='me-4' onClick={() => { navigate('/administration/formateurs') }}><FontAwesomeIcon icon={faGears} /> LES FORMATEURS</ButtonNav>

                                    }
                                    {isAuthenticatedStatus.roles.includes("ROLES_INSTRUCTORS") &&
                                        <ButtonNav className='me-4' onClick={() => { navigate('/mes-cours') }}><FontAwesomeIcon icon={faGears} /> GERER MES FORMATIONS</ButtonNav>
                                    }
                                    {isAuthenticatedStatus.roles.includes("ROLES_STUDENT") &&
                                        <ButtonNav className='me-4'>
                                            <NavLink className='me-5' to='/catalogue'>CATALOGUE DES FORMATIONS</NavLink>

                                            <div className="btn-group">
                                                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    MES FORMATIONS
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {studentCourse && studentCourse.map(student => {
                                                        return (
                                                            <li key={Math.random()}><a className="dropdown-item  nav-link" onClick={() => handleStartCourses(student)}>{student.courses.title}</a></li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        </ButtonNav>

                                    }
                                    <div className="dropdown me-2">
                                        {isAuthenticatedStatus.roles.includes("ROLES_INSTRUCTORS") &&
                                            <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                <Avatar src={"http://localhost:8000/avatar/" + isAuthenticatedStatus.avatar} size="50" round={true} color="#364958" />
                                            </a>
                                        }
                                        {isAuthenticatedStatus.roles.includes("ROLES_STUDENT") && <>
                                            <span className='me-2'>Bienvenu(e), {isAuthenticatedStatus.pseudo}</span>
                                            <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                <Avatar value={isAuthenticatedStatus.pseudo.substr(0, 2)} size="50" round={true} color="#0ea47a" />
                                            </a></>
                                        }
                                        {isAuthenticatedStatus.roles.includes("administrator") &&
                                            <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                <Avatar value="ADM" size="50" round={true} color="#364958" />
                                            </a>
                                        }

                                        <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuLink">
                                            {isAuthenticatedStatus.roles.includes("ROLES_INSTRUCTORS") &&
                                                <li><div style={{ "cursor": 'pointer' }} className="dropdown-item" onClick={handleProfil}>Mon Profil</div></li>

                                            }
                                            <li><div style={{ "cursor": 'pointer' }} className="dropdown-item" onClick={handleDisconnect}>Se Déconnecter</div></li>

                                        </ul>
                                    </div>
                                </>
                            ) : <Button onclick={handleConnect} text='SE CONNECTER' />
                            }
                        </div>
                    </div>
                </div>

            </nav>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">

                    <div className="dropdown mt-3 d-flex flex-column align-items-center justify-content-center">
                        {!isAuthenticatedStatus.status && <>
                            <Logo />
                            <div data-bs-dismiss="offcanvas" className='mt-5'>
                                <NavLink to='/catalogue'>CATALOGUE DES FORMATIONS</NavLink>
                            </div>
                            <div data-bs-dismiss="offcanvas" className='mt-5'>
                                <NavLink to='/inscription-formateur'>DEVENIR INSTRUCTEUR ?</NavLink>
                            </div>
                            <Button onclick={handleStudent} alternative offcanvas text="S'INSCRIRE" />
                        </>
                        }



                        {isAuthenticatedStatus.status ?

                            <>

                                {isAuthenticatedStatus.roles.includes("ROLES_INSTRUCTORS") &&
                                    <>
                                        <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        </a>
                                        <Avatar src={"http://localhost:8000/avatar/" + isAuthenticatedStatus.avatar} size="50" round={true} color="#364958" />

                                        <ButtonNav data-bs-dismiss='offcanvas' className='mt-4' onClick={() => { navigate('/mes-cours') }}><FontAwesomeIcon icon={faGears} /> GERER MES FORMATIONS</ButtonNav>
                                    </>
                                }

                                {
                                    isAuthenticatedStatus.roles.includes("administrator") &&

                                    <>                                        <Avatar value="ADM" size="50" round={true} color="#364958" />

                                        <p className='mt-5'>Administrateur</p>
                                        <ButtonNav className='mt-5' data-bs-dismiss="offcanvas" onClick={() => { navigate('/administration/formateurs') }}><FontAwesomeIcon icon={faGears} /> LES FORMATEURS</ButtonNav>
                                    </>
                                }

                                {
                                    isAuthenticatedStatus.roles.includes("ROLES_STUDENT") &&

                                    <>

                                        <Avatar value={isAuthenticatedStatus.pseudo.substr(0, 2)} size="50" round={true} color="#0ea47a" />

                                        <span className='mt-2'>Bienvenu(e), {isAuthenticatedStatus.pseudo}</span>

                                        <div data-bs-dismiss="offcanvas" className='mt-5'>
                                            <NavLink to='/catalogue'>CATALOGUE DES FORMATIONS</NavLink>
                                        </div>
                                        <ButtonNav className='mt-4'>


                                            <div className="btn-group">
                                                <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    MES FORMATIONS
                                                </button>
                                                <ul className="dropdown-menu">
                                                    {studentCourse && studentCourse.map(student => {
                                                        return (
                                                            <li key={Math.random()}><a className="dropdown-item  nav-link" data-bs-dismiss='offcanvas' onClick={() => handleStartCourses(student)}>{student.courses.title}</a></li>
                                                        )
                                                    })
                                                    }
                                                </ul>


                                            </div>



                                            <hr />
                                        </ButtonNav>
                                    </>
                                }




                                <Button offcanvas text="SE DECONNECTER" deconnect onclick={handleDisconnect} />
                            </>

                            :

                            <Button offcanvas onclick={handleConnect} text='SE CONNECTER' />}

                    </div>
                </div>
            </div>

        </>
    )
}

const ButtonNav = styled.span`
cursor:pointer;
color:#364958;
&:hover {
    color: #67C5AB;
  }
`

export default NavBar