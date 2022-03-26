import React from 'react'
import styled from 'styled-components'
import Arsenal from '../styles/fonts/Arsenal-Regular.ttf'


const Button = ({ text, alternative, offcanvas, onclick, deconnect, simple, sending }) => {


    return (
        <Wrapper alternative={alternative} simple sending data-bs-dismiss={offcanvas ? "offcanvas" : null} offcanvas={offcanvas} onClick={onclick} deconnect={deconnect} >{sending ?
            <><span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span ><span> CHARGEMENT</span></>
            : text}</Wrapper>

    )
}

const Wrapper = styled.div`

    background-color:${props => props.alternative ? "#FFFFFF" : (props.deconnect ? "#EAEBED" : "#0EA47A")};
    margin-left:${props => props.offcanvas || props.simple ? "0rem" : "1rem"};
    margin-top:${props => props.offcanvas ? "2rem" : "0rem"};
	border-radius:10px;
	border:${props => props.deconnect ? "" : "1px solid #18ab29"};
	cursor:pointer;
	color:${props => props.alternative ? "#0EA47A" : "#FFFFFF"};
	font-size:1rem;
    text-align:center;
	padding:5px 10px;
	text-decoration:none;
    @font-face {
        font-family: 'Arsenal';
        src: url(${Arsenal}) format('truetype');
      };
      font-family:'Arsenal';

`

export default Button