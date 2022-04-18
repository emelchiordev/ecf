import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const CardCourse = ({ image, title, description, handleFollow }) => {
    return (
        <div onClick={handleFollow} data-bs-toggle="modal" data-bs-target="#exampleModal"
        >
            <Wrapper image>
                <Image src={image} width='100%' height='100%' />

                <h5 className='mt-2 p-2 text-center'>{title}</h5>
            </Wrapper>

        </div >
    )
}

const Wrapper = styled.div`
margin-top:20px;
width: 300px;
background: #FFF;
overflow: hidden;
border-radius: 10px;
cursor: pointer;
box-shadow: 0 0 10px 1px #d0d0d0;

`

const Image = styled.img`
background-color:#FFF;
object-fit:contain;
width:300px;
min-height:180px;
max-height:180px;
`

export default CardCourse