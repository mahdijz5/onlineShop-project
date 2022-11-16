import styled from "@emotion/styled"
import { BookmarkAddOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { setPoint } from "../../helpers/tools"
import styles from "../../styles/ProductCard.module.css"



const HoverBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    visibility: "hidden",
    display: "flex",
    transition: "0.5s",
    top: "100%",
    bottom: "-1000px",
    right: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: "5px"
}))

const StyledIconButton = styled(IconButton)({
    width: "100px",
    backgroundColor: "white",
    borderRadius: "10px",
    transition: '0.2s',
    ":hover": {
        backgroundColor: "whitesmoke",
    }
})

const ProductCard = ({ product: singleProduct, solid ,width ,height}) => {
    const router = useRouter() 
    const [product, setProduct] = useState(singleProduct)
    useEffect(() => {
        setProduct(singleProduct)
    }, [])

    const StyledCard = styled(Card)(({ theme }) => ({
        width: width ? width : 260,
        height: height ? height : "auto",
        display: "inline-block",
        margin: solid ? "0" : "10px 4px",
        borderRadius : solid ? "0" : theme.shape.borderRadius,
        boxShadow : solid ? theme.shadows[0] : theme.shadows[1],
        outline: solid ? `1px solid ${theme.palette.grey[200]}` : "0",
        padding: "20px",
        position: "relative",
    }))

    return (
        <>
            <StyledCard className={styles.card} >
                <CardMedia
                    component="img"
                    height="230"
                    image="./images/product1.jpg"
                    alt="Paella dish"
                />
                <CardContent sx={{ padding: "0 10px 0 10px" }} >
                    <Typography variant="body1" fontWeight={'bold'}>
                        {product.name}
                    </Typography>
                </CardContent>
                <Box p={1}>
                    <Typography variant="body2" color="primary.main" >
                        {setPoint(product.price.low)} تومان
                    </Typography>
                </Box>
                <HoverBox className={styles.actionBox}>
                    <StyledIconButton >
                        <BookmarkAddOutlined />
                    </StyledIconButton>
                    <Link href="/product/[id]" as={`/product/${product._id}`}>
                        <a>
                        <StyledIconButton >
                        <ShoppingCartOutlined />
                    </StyledIconButton>
                        </a>
                    </Link>
                </HoverBox>
            </StyledCard>
        </>
    )
}

export default ProductCard