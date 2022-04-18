import React from 'react'
import styled from 'styled-components'
import logo from '../styles/img/logoeco.png'

const Logo = () => {
    return (
        <Wrapper className='d-flex align-items-center justify-content-center'>
            <img src={logo} width='75' height="75" />
            <h1 className='ms-2 display-4'>ECO <span style={{ "color": "#0EA47A" }}>IT</span></h1>

        </Wrapper>
    )
}

const Wrapper = styled.div`

`

export default Logo