import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React from 'react'

const StyledBox = styled(Box)(({theme}) => ({
    position : "relative",
    top :"100%",
    height : "150px",
    backgroundColor : theme.palette.primary.main,
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    color : "white"
}))


const Footer = () => {
  return (
    <>
        <StyledBox >
            Footer
        </StyledBox>
    </>
  )
}

export default Footer