import React, { useState } from 'react'
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Courses = () => {

  const [activePage, setActivePage] = useState(0)

  return (
    <div className='container d-flex flex-column align-items-center'>
      <NavLink to='../mes-cours' className='mt-4 align-self-end pe-auto'><FontAwesomeIcon icon={faCircleArrowLeft} size="1x" /> RETOUR</NavLink>

      <Wrapper>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink to='editer' className={activePage === 0 ? "nav-link active" : "nav-link"} aria-current="page">Cours</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='sections' className={activePage === 1 ? "nav-link active" : "nav-link"} aria-current="page">Sections</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='lecons' className={activePage === 2 ? "nav-link active" : "nav-link"} aria-current="page">Leçons</NavLink>
          </li>

        </ul>
        <Outlet context={[activePage, setActivePage]} />
      </Wrapper>

    </div>


  )
}

const Wrapper = styled.div`
padding:1rem;
margin-top:1rem;
background-color:#fff;
width:100%;
text-align:center;
border-radius:15px;
box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

`
export default Courses