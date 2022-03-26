import React, { useState } from 'react'
import logo from '../styles/img/ecoit.jpg'
import Button from './Button'
import { useNavigate } from "react-router-dom";
import Authenticated from '../services/Authenticated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'




import Avatar from 'react-avatar';


const NavBar = ({ isAuthenticatedStatus }) => {
    const navigate = useNavigate();

    console.log(isAuthenticatedStatus)

    const handleConnect = () => {
        navigate("/connexion");
    }

    const handleDisconnect = () => {
        Authenticated.expirateToken();
        navigate("../", { replace: true });
    };



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={logo} width="185" height="47" alt="logo ECO IT" />
                    </a>

                    <div className="ms-auto">


                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" >
                            <span className="navbar-toggler-icon"></span>
                        </button>


                        <div className="collapse navbar-collapse " id="navbarToggleExternalContent">
                            {!isAuthenticatedStatus.status && <>
                                <span>DEVENIR INSTRUCTEUR ?</span>
                                <Button alternative text="S'INSCRIRE" />
                            </>
                            }
                            {isAuthenticatedStatus.status === true ? (isAuthenticatedStatus.roles.includes("administrator") &&
                                <>
                                    <ButtonNav className='me-4' onClick={() => { navigate('/administration/formateurs') }}><FontAwesomeIcon icon={faGears} /> LES FORMATEURS</ButtonNav>
                                    <div className="dropdown me-2">

                                        <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            <Avatar value="ADM" size="50" round={true} color="#364958" />
                                        </a>

                                        <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuLink">

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
                            <span>DEVENIR INSTRUCTEUR ?</span>
                            <Button alternative offcanvas text="S'INSCRIRE" />
                        </>
                        }

                        {isAuthenticatedStatus.status ?
                            <>
                                <Avatar value="ADM" size="50" round={true} color="#364958" />
                                <p>Administrateur</p>
                                <ButtonNav className='me-4' data-bs-dismiss="offcanvas" onClick={() => { navigate('/administration/formateurs') }}><FontAwesomeIcon icon={faGears} /> LES FORMATEURS</ButtonNav>
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