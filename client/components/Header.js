import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const StyledBox = styled(Box)(({theme}) => ({
    height : "215px",
    width : "100%",
    backgroundColor : theme.palette.primary.main,
    display : "flex",
    justifyContent :"center" ,
    alignItems : "center"
}))

const Header = () => {
    return (
        <StyledBox >
            <Typography variant="h5" display="inline-block" color="white">کفش های مردانه</Typography>
        </StyledBox>
    )
}

export default Header