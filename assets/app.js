
import './styles/app.css';
import './bootstrap';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import NavBar from './container/NavBar';
import Homepage from './pages/homepage';
import Loginpage from './container/LoginPage';
import { Provider } from "react-redux"
import store from './store';
import Authenticated from './services/Authenticated';
import Adminpage from './pages/Adminpage';
import GuardedRoute from './container/GuardedRoute';
import AddTeacherPage from './pages/forms/AddTeacherPage';
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import TeachersList from './pages/TeachersList';
import RegisterTeacherPage from './pages/forms/RegisterTeacherPage';
import ProfilSetting from './container/ProfilSetting';
import CoursesList from './pages/CoursesList';
import AddCoursePage from './container/AddCoursePage';
import CoursesEdit from './pages/CoursesEdit';
import Courses from './pages/Courses';
import Sections from './pages/Sections'
import Lessons from './pages/Lessons'
import AddLessonPage from './pages/forms/AddLessonPage';


const App = () => {

    const [tokenValid, setTokenValid] = useState(Authenticated.tokenDateIsValid())

    useEffect(() => {
        setTokenValid(Authenticated.tokenDateIsValid())
    }, [store.getState().authenticated])

    return <>
        <Provider store={store}>
            <Router>
                <div style={{ "backgroundColor": "#fafafa", "height": '100vh' }}>
                    <NavBar />
                    <Routes>
                        <Route path="inscription-formateur" element={<RegisterTeacherPage />}></Route>
                        <Route path="/administration" element={<GuardedRoute ><Adminpage /></GuardedRoute>} >
                            <Route path="formateurs" element={<GuardedRoute ><TeachersList /></GuardedRoute>} >
                            </Route>

                            <Route path="ajouter-formateur" element={<GuardedRoute ><AddTeacherPage /></GuardedRoute>} ></Route>

                        </Route>
                        <Route path="/ajouter-cours" element={<GuardedRoute ><AddCoursePage /></GuardedRoute>} ></Route>
                        <Route path="/editer-lecons/:id" element={<GuardedRoute ><AddLessonPage /></GuardedRoute>} >
                        </Route>
                        <Route path="/cours/:id" element={<GuardedRoute ><Courses /></GuardedRoute>} >

                            <Route path="lecons" element={<GuardedRoute ><Lessons /></GuardedRoute>} >
                            </Route>
                            <Route path="sections" element={<GuardedRoute ><Sections /></GuardedRoute>} >
                            </Route>
                            <Route path="editer" element={<GuardedRoute ><CoursesEdit /></GuardedRoute>} >
                            </Route>

                        </Route>

                        <Route path="/mes-cours" element={<GuardedRoute ><CoursesList /></GuardedRoute>} >
                        </Route>

                        <Route path="/mon-profil" element={<GuardedRoute ><ProfilSetting /></GuardedRoute>} ></Route>
                        <Route path="/connexion" element={<Loginpage />} >
                        </Route>
                        <Route path="/" element={<Homepage />}>
                        </Route>
                    </Routes>
                </div>
            </Router>
        </Provider>
    </>

}

const rootElement = document.querySelector('#app')
ReactDOM.render(<App />, rootElement)