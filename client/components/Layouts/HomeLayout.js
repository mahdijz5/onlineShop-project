import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { HomeLayoutContext } from "../../context/context";
import { getAllBrands, getAllCategories } from "../../services/product";
import Footer from "../Footer";
import Header from "../Header";
import MainBody from "../MainBody";
import Nav from "../Nav";

const HomeLayout = ({ children }) => {
    const [categories,setCategories] = useState([])
    const [brands,setBrands] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const {data : allBrands} = await getAllBrands()
            const {data : allCategories} = await getAllCategories()
            setCategories(allCategories.categories)
            setBrands(allBrands.brands)
        }
        fetchData()
    },[])
   
    return (
        <HomeLayoutContext.Provider value={{
            categories,
            brands
        }}>
        <Box width={"100%"} height={"100%"} position="relative">
            <Nav />
            <Header />
            <MainBody offerSwiper={true}>
                {children}
            </MainBody>
            <Footer/>
        </Box>
        </HomeLayoutContext.Provider>
    )
}

export default HomeLayout;