import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React from 'react'

import OfferSwiper from "./OfferSwiper"

const StyledBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "185px",
    left: "100px",
    right: "100px",
    bottom: "100px",
    height: "1650px",
    backgroundColor: "white",
    zIndex: "2",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"

}))

const Container = styled(Box)({
    height: "1750px",
})

const MainBody = ({ children }) => {
    return (
        <Container>
            <StyledBox>
                <Box  width="100%" height="100%">
                    <Box height="20%">
                        <OfferSwiper />
                    </Box>
                    <Box height="80%">
                    {children}
                    </Box>
                </Box>
            </StyledBox>
        </Container>
    )
}

export default MainBody