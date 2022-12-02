import styled from "@emotion/styled"
import { Add, Delete, Remove } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useContext, useReducer, useState } from "react"
import { addToCart, removeFromCart } from "../../helpers/action"
import { setPoint, truncate } from "../../helpers/tools"
import { General } from "../../context/context"
import { addProductToList } from "../../services/user"
import Link from "next/link"

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: "unset",
    border: `1px solid ${grey[300]}`,
    width: "100%",
}))

const DiscountBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.danger.main,
    color: "white",
    borderRadius: "0 0 10px 10px",
    position: "absolute",
    padding: "5px"
}))

function ProductCard({ product, user, reducerOption, deleteOption,count }) {

    const { setRefresh } = useContext(General)

    const initialState = { count: product.count };
    const [amount, dispatch] = useReducer(reducer, initialState);
    const changeCart = (action) => {
        if (action == "increment") {
            if (amount.count !== product.amount) {
                addToCart(product._id, user, (res) => {

                })
            }
        } else {
            removeFromCart(product._id, user, (res) => {
            })
        }
        setRefresh((p) => !p)

    }
    function reducer(amount, action) {
        switch (action.type) {
            case 'increment':
                if (amount.count != product.amount) {
                    return { count: amount.count + 1 };
                } else {
                    return { count: amount.count };
                }
            case 'decrement':
                if (amount.count > 1) {
                    return { count: amount.count - 1 };
                } else {
                    return { count: 1 };
                }
            default:
                throw new Error();
        }
    }

    return (
        <StyledCard sx={{ display: 'flex' }}  >
            {product.discount > 0 ? (
                <DiscountBox>
                    {product.discount}%
                </DiscountBox>
            ) : null}
            <Link href={`/product/${product._id}`}>
                <a>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={`http://localhost:3001//uploads/thumbnail/${product.thumbnail[0]}`}
                        alt={product.name}

                    />
                </a>
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'row', }} width="100%">
                <CardContent sx={{ flex: '1 0 auto', width: "70%", padding: "10px 0",textAlign : "left",paddingLeft : "10px" }} >
                    <Link href={`/product/${product._id}`}>
                        <a>
                            <Typography component="div" variant="body1">
                                {truncate(product.name,50)}
                            </Typography>
                        </a>
                    </Link>
                    <Rating value={product.rate} readOnly size="small"/>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {product.description}
                    </Typography>
                </CardContent>
                <Stack width="30%" textAlign="center" p="10px">
                    <Box height="50%" textAlign="center">
                        {product.discount > 0 ? (
                            <>
                                <Typography variant="body1" className="priceWithDiscount">{setPoint(product.price.low)}</Typography>
                                <Typography variant="body1" >{setPoint(product.price.low - ((product.price.low * product.discount) / 100))}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1"  >{setPoint(product.price.low)}</Typography>
                        )}
                    </Box>
                    <Stack height="50%" direction={{ sm: "column", md: "row" }} gap="5px" justifyContent="center" alignItems="center" >
                        {count ? (
                            <>
                                <Button variant="contained" sx={{ width: { sm: "100%", md: "50%" } }}>{product.count}</Button>
                            </>
                        ) : null}
                        {reducerOption ? (
                            <>
                                <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                                    dispatch({ type: 'increment' })
                                    changeCart("increment")
                                }} ><Add /></Button>
                                <Button variant="contained" sx={{ width: { sm: "100%", md: "50%" } }}>{product.count}</Button>
                                <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                                    dispatch({ type: 'decrement' })
                                    changeCart("decrement")
                                }} ><Remove /></Button>
                            </>
                        ) : null}
                        {deleteOption ? (
                            <>
                                <Button variant="outlined" color="danger" onClick={() => {
                                    addProductToList(product._id, (data, err) => {

                                        setRefresh((p) => !p)
                                    })
                                }} ><Delete /></Button>
                            </>
                        ) : null}
                    </Stack>
                </Stack>
            </Box>
        </StyledCard>
    )
}

export default ProductCard