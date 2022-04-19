import React, { useState, useEffect } from 'react'
import CoursesApi from '../services/CoursesApi';
import CardCourseHome from '../components/CardCourseHome';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

const HomePageWrapper = ({ isAuthenticatedStatus }) => {


    const [courses, setCourses] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        CoursesApi.getFilteredCourses().then(res => {
            if (res.status === 200) {
                setCourses(res.data)
            }
        })

        return () => setCourses([])
    }, [])

    const handleFollow = () => {
        navigate('/catalogue')
    }

    return (
        <div className="text-center col-12 col-lg-6 ">
            <div className="mt-10">
                <Logo />
                <h1 className='display-6 mt-2 p-5'>Les bonnes pratiques pour <span style={{ "color": "#0ea479" }}>éco-concevoir</span> un site web</h1>
                <p style={{ "lineHeight": '2.5rem' }}>Le monde comptait en juin 2020 plus d’1,78 milliard de sites web. Or, Internet demande toujours plus de ressources en énergie pour fonctionner. Un site web génère 4,61 grammes de CO2 à chaque page consultée.

                    Il devient urgent de réduire l’impact du numérique sur notre environnement. 4 % des émissions de gaz à effet de serre sont imputées à l’industrie du web. </p>
                {isAuthenticatedStatus.roles === undefined &&
                    <div className='d-flex justify-content-center mt-10'>
                        <Button onclick={() => { navigate('/catalogue') }} alternative={true} text="VOIR NOS FORMATIONS" />
                        <Button onclick={() => { navigate('/connexion') }} text="SE CONNECTER" />
                    </div>
                }
            </div>

            {isAuthenticatedStatus.roles === undefined &&
                <div className='mt-20'>

                    <h3>Nos dernières formations</h3>

                    <div className='d-flex justify-content-evenly flex-wrap'>
                        {courses.map(course => {
                            return (
                                <CardCourseHome
                                    handleFollow={() => handleFollow(course)}
                                    title={course.title}
                                    key={course.id}
                                    description={course.description}
                                    image={course.photos.contentUrl}
                                />

                            )

                        })}
                    </div>
                </div>
            }

        </div>
    )
}

export default HomePageWrapper