import React from 'react'
import styled from 'styled-components'

const CardCourseHome = ({ image, handleFollow }) => {
    return (
        <div onClick={handleFollow} data-bs-toggle="modal" data-bs-target="#exampleModal"
        >

            <Image src={image} width='100%' height='100%' />



        </div >
    )
}



const Image = styled.img`
box-shadow: 0 0 10px 1px #d0d0d0;

margin-top:20px;
border-radius: 10px;
cursor: pointer;
background-color:#fff;
object-fit:contain;
width:300px;
min-height:180px;
max-height:180px;
`

export default CardCourseHome
