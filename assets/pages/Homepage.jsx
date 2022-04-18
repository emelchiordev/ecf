import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import CoursesApi from '../services/CoursesApi';
import { UndrawTabs, UndrawDesigner, UndrawResponsive } from 'react-undraw-illustrations';
import HomePageWrapper from '../container/HomePageWrapper';


const Homepage = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        CoursesApi.getFilteredCourses().then(res => {
            if (res.status === 200) {
                setCourses(res.data)
            }
        })
    }, [])

    return (
        <>

            <div className="container-fluid" style={{ "backgroundColor": "#FFF" }}>
                <div className="d-flex flex-row">

                    <HomePageWrapper />



                    <div className="curves position-relative ">
                        <Wrapper2>

                            <UndrawDesigner
                                primaryColor='#0ea479'
                                skinColor="#e2bd95"
                                hairColor="#222"
                                height='700px' />
                        </Wrapper2>
                    </div>
                </div>
            </div>


        </>
    )
}



const Wrapper2 = styled.div`
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`

export default Homepage