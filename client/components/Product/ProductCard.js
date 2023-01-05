import styled from "@emotion/styled"
import { Add, ShoppingCartOutlined } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { setPoint, toastNotif, truncate } from "../../helpers/tools"
import { General } from "../../context/context"
import styles from "../../styles/ProductCard.module.css"
import useEditCart from "../../hooks/useEditCart"
import { editCart } from "../../services/user"

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

const DiscountBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    borderRadius: "2px",
    display: "inline-block",
    position: "absolute",
    padding: "1px 8px",
    top: 28,
    left: 26,


}))

const ProductCard = ({ product: singleProduct, solid, width, height, padding, children }) => {
    const { user } = useContext(General)
    const paddingValue = padding || "20px"
    const router = useRouter()
    const [product, setProduct] = useState(singleProduct)

    useEffect(() => {
        setProduct(singleProduct)
    }, [])

    const StyledCard = styled(Card)(({ theme }) => ({
        height: height ? height : "auto",
        width: width ? width + "!important" : '260px',
        [theme.breakpoints.up('lg')]: {
            width: solid ? "25%" : "",
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
    
    let countOfProduct = 1
    const addToCart = () => {
        if (user.cart == undefined) {
            let myCart = localStorage.getItem('cart')?.split(',')
            myCart.push(product._id)
            localStorage.setItem('cart', mycart)
        } else {
            let myCart = [...user.cart]
            for (let product of myCart) {
                if (product == product._id) {
                    countOfProduct++;
                }
            }

            editCart({ id: product._id, count: countOfProduct }, (data, err) => {
                countOfProduct++;
            })
        }
    }

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
                    <Typography variant="body1" fontSize="15x" fontWeight={'bold'}>
                        {truncate(product.name, 25)}
                    </Typography>
                </CardContent>
                <Box p={1} gap="7px">
                    {product.discount > 0 ? (
                        <>
                            <Typography variant="caption" color="primary.main"  >{setPoint(product.price.low - ((product.price.low * product.discount) / 100))} تومان</Typography>
                            <br />
                            <Typography variant="caption" fontSize="10px" color="primary.main" className="solidPriceWithDiscount">{setPoint(product.price.low)} تومان</Typography>
                        </>
                    ) : (
                        <Typography variant="body2" color="primary.main" >{setPoint(product.price.low)} تومان</Typography>
                    )}

                </Box>
                <HoverBox className={styles.actionBox}>
                    <StyledIconButton onClick={() => {
                        addToCart()
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
                <DiscountBox>

                    <Typography variant="caption">{product.discount}%</Typography>
                    {children}
                </DiscountBox>
            </StyledCard>
        </>
    )
}

export default ProductCard