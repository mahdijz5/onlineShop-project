import styled from '@emotion/styled'
import { Box, Card, Skeleton, Stack } from '@mui/material'
import React from 'react'

const ProductCardSkeleton = ({ solid, width, height, padding }) => {
    const StyledCard = styled(Stack)(({ theme }) => ({
        height: height ? height : "auto",
        width: width ? width + "!important" : '260px',
        [theme.breakpoints.up('lg')]: {
            width: solid ? "20%" : "",
        },
        [theme.breakpoints.down('lg')]: {
            width: solid ? "25%" : "",
        },
        [theme.breakpoints.down('md')]: {
            width: solid ? "50%" : "",
        },
        [theme.breakpoints.down('sm')]: {
            width: solid ? "100%" : "",
        },
        margin: solid ? "0" : "10px 4px",
        borderRadius: solid ? "0" : theme.shape.borderRadius,
        boxShadow: solid ? theme.shadows[0] : theme.shadows[1],
        outline: solid ? `1px solid ${theme.palette.grey[200]}` : "0",
        padding: padding || "20px",
        position: "relative",
        backgroundColor : "white",
    }))
    return (
        <StyledCard gap="7px"   >
            <Skeleton width={"100%"} height={230} variant="rectangular"/>
            <Skeleton width={"100%"} height={10} variant="rectangular"/>
            <Skeleton width={"100%"} height={13} variant="rectangular"/>
        </StyledCard>
    )
}

export default ProductCardSkeleton