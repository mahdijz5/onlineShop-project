import { Box } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContainer from '../containers/MainContainer'
import Nav from '../components/Nav'

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
            </Box>
        </>
    )
}

export default ProductLayout