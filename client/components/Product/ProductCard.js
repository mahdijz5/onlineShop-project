import styled from "@emotion/styled"
import { Add, BookmarkAddOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { addToCart } from "../../helpers/action"
import { setPoint, toastNotif, truncate } from "../../helpers/tools"
import { General } from "../../context/context"
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

const ProductCard = ({ product: singleProduct, solid, width, height,padding }) => {
    const {user} = useContext(General)
    const paddingValue = padding || "20px"
    const router = useRouter()
    const [product, setProduct] = useState(singleProduct)
    useEffect(() => {
        setProduct(singleProduct)
    }, [])

    const StyledCard = styled(Card)(({ theme }) => ({
        height: height ? height : "auto",
        width: width ? width+"!important" : '260px',
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
        display: "inline-block",
        margin: solid ? "0" : "10px 4px",
        borderRadius: solid ? "0" : theme.shape.borderRadius,
        boxShadow: solid ? theme.shadows[0] : theme.shadows[1],
        outline: solid ? `1px solid ${theme.palette.grey[200]}` : "0",
        padding: paddingValue,
        position: "relative",
    }))

    return (
        <>
            <StyledCard className={styles.card} >
                <CardMedia
                    component="img"
                    height="230"
                    image={`http://localhost:3001//uploads/thumbnail/${product.thumbnail[0]}`}
                    alt="Paella dish"
                />
                <CardContent sx={{ padding: "0 10px 0 10px" }} >
                    <Typography variant="body1" fontWeight={'bold'}>
                        {truncate(product.name,25)}
                    </Typography>
                </CardContent>
                <Box p={1}>
                    <Typography variant="body2" color="primary.main" >
                        {setPoint(product.price.low)} تومان
                    </Typography>
                </Box>
                <HoverBox className={styles.actionBox}>
                    <StyledIconButton onClick={() => {
                        addToCart(product._id, user, (res) => {
                            toastNotif(res.message, res.status, 0)
                        })
                    }}>
                        <Add />
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