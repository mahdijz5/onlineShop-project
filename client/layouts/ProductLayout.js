import { Box } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContainer from '../containers/MainContainer'
import Nav from '../components/Nav'
import { ToastContainer } from 'react-toastify'

function ProductLayout({ children }) {
    return (
        <>
            <Box width={"100%"} height={"100%"} position="relative">
                <Nav />
                <Header/>
                <MainContainer>
                    {children}
                </MainContainer>
                <Footer />
                <ToastContainer/>
            </Box>
        </>
    )
}

export default ProductLayout