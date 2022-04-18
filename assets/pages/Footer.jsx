import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <Wrapper>


            <div><a href="#"><i className="icon ion-social-instagram"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-facebook"></i></a></div>

            <div className="row p-0 m-0 d-flex justify-content-center align-items-center">
                <div className="col-lg-4 p-10 text-center">
                    <h3 className='text-center'>ECO IT</h3>
                    <p>
                        Eco-concevoir un site Internet, c’est faire en sorte de construire un site web dont les émissions carbone soient les plus faibles possible.
                    </p>
                </div>
                <div className="col-lg-4 p-10 text-center">
                    <p>
                        <a onClick={() => navigate('/politique-confidentialite')}> POLITIQUE DE CONFIDENTIALITE                    </a>
                    </p>
                </div>
                <div className="col-lg-4 p-10 text-center">
                    <p>
                        <a style={{ 'color': '#fff' }} href='mailto:ecoit@ecoit.com'>NOUS CONTACTER </a>
                    </p>

                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`

color:#fff;
a:#fff ;
background-color:#535461;
margin-top:5rem;

`

export default Footer