import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ProductCard from "../Product/ProductCard"

const StyledBox = styled(Box)(({theme}) => ({
    display : "flex",
    flexWrap : "wrap",
    gap : "",
    
}))

const SearchBody = ({products : allProducts}) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        setProducts(allProducts ? allProducts : [])
    },[])

    return (
    <>
        <StyledBox>
            {products.length > 0 ? 
                products.map((product,index) => (
                    <ProductCard product={product} solid={true} width="20%" key={index}/>
                ))
            : (
                <Typography>محصولی وجود ندارد</Typography>
            )}
            
        </StyledBox>
    </>
  )
}

export default SearchBody