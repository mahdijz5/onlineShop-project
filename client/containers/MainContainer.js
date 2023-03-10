import styled from '@emotion/styled'
import { Box, Paper } from '@mui/material'
import React from 'react'

import SuggestionSwiper from "../components/Swipers/SuggestionSwiper"

const StyledBox = styled(Paper)(({ theme }) => ({
    position: "relative",
    top: "-45px",
    height: "auto",
    display: "flex",
    left: "5%",
    width: "90%",
    [theme.breakpoints.down('md')]: {
        width: "100%",
        left: 0
    },
    backgroundColor: "white",
    zIndex: "2",
    overflowY: "auto"

}))

const Container = styled(Box)({
    height: "auto",
})

const MainContainer = ({ children, suggestionSwiper }) => {
    return (
        <Container>
            <StyledBox className="niceScroll" elevation={6} >
                <Box width="100%" height="100%">
                    {suggestionSwiper ? (
                        <Box height="20%">
                            <SuggestionSwiper />
                        </Box>
                    ) : null}
                    <Box height="80%">
                        {children}
                    </Box>
                </Box>
            </StyledBox>
        </Container>
    )
}

export default MainContainer