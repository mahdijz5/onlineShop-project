import { Box } from '@mui/material'
import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import MainBody from '../MainBody'
import Nav from '../Nav'

function ProductLayout({ children }) {
    return (
        <>
            <Box width={"100%"} height={"100%"} position="relative">
                <Nav />
                <Header/>
                <MainBody>
                    {children}
                </MainBody>
                <Footer />
            </Box>
        </>
    )
}

export default ProductLayout