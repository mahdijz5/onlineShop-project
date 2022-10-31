import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React from 'react'

const StyledBox = styled(Box)(({theme}) => ({
    position : "absolute",
    bottom : "0",
    right : "0",
    left : "0",
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