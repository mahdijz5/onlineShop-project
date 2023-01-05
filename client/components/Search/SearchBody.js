import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useProductSearch from '../../hooks/useProductSearch'

import ProductCard from "../Product/ProductCard"
import ProductCardSkeleton from '../Product/ProductCardSkeleton'

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "0",
    height: "100%",
    flexWrap: "wrap",
}))

const SearchBody = ({ productPerPage }) => {
    const router = useRouter()
    const [getProducts, setProducts] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const { error, hasMore, loading, products } = useProductSearch(router.query, pageNumber || 1, productPerPage)
    const observer = useRef()
    const lastProductRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                console.log("visible")
                setPageNumber(p => p + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        setProducts(products)
    }, [products])
    return (
        <>
            <StyledBox>
                {getProducts.length > 0 ?
                    getProducts.map((product, index) => {
                        if (getProducts.length == index + 1) {
                            return (<ProductCard product={product} solid={true} key={index}><div ref={lastProductRef}></div></ProductCard>)
                        } else {
                            return <ProductCard product={product} solid={true} key={index} />
                        }
                    })
                    : (
                        <Typography>محصولی وجود ندارد</Typography>
                    )}
                {loading ? (
                    <>
                        <ProductCardSkeleton solid={true} />
                        <ProductCardSkeleton solid={true} />
                        <ProductCardSkeleton solid={true} />
                        <ProductCardSkeleton solid={true} />
                    </>
                ) : null}
            </StyledBox>
        </>
    )
}

export default SearchBody

