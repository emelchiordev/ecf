import React from 'react'
import styled from 'styled-components'
import Arsenal from '../styles/fonts/Arsenal-Regular.ttf'


const Button = ({ text, alternative, offcanvas, onclick, deconnect, simple, sending, closeModal }) => {


    return (
        <Wrapper
            alternative={alternative}
            simple={false}
            sending
            data-bs-dismiss={offcanvas ? "offcanvas" : null || closeModal ? "modal" : null} offcanvas={offcanvas} onClick={onclick} deconnect={deconnect} >{sending ?
                <><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span ><span> CHARGEMENT</span></>
                : text}</Wrapper>

    )
}

const Wrapper = styled.div`

    background-color:${props => props.alternative ? "#FFFFFF" : (props.deconnect ? "#EAEBED" : "#0ea479c4")};
    margin-left:${props => props.offcanvas || props.simple ? "0rem" : "1rem"};
    margin-top:${props => props.offcanvas ? "2rem" : "0rem"};
	border-radius:10px;
	border:${props => props.deconnect ? "" : "1px solid #0ea479c4"};
	cursor:pointer;
	color:${props => props.alternative ? "#0ea479c4" : "#FFFFFF"};
	font-size:1rem;
    text-align:center;
	padding:5px 10px;
	text-decoration:none;
    &:hover {
        background-color: '#999';
      }
    @font-face {
        font-family: 'Arsenal';
        src: url(${Arsenal}) format('truetype');
      };
      font-family:'Arsenal';

`

export default Button