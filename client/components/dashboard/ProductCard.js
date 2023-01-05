import styled from "@emotion/styled"
import { Add, Delete, Remove } from "@mui/icons-material"
import { Box, Button, Card, CardContent, CardMedia, Rating, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import {  useContext, useEffect, useState } from "react"
import _ from "lodash"
import { setPoint, truncate } from "../../helpers/tools"
import { General } from "../../context/context"
import { addProductToList } from "../../services/user"
import Link from "next/link"
import useEditCart from "../../hooks/useEditCart"

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

function ProductCard({ product, user, reducerOption, deleteOption, count }) {

    const { setRefresh } = useContext(General)
    const [existion, setExistion] = useState(true);
    const [getCount, setCount] = useState()
    const value  = useEditCart(getCount,product.count,1000,product._id,user)
    useEffect(() => {
        setCount(product.count)
    }, [])
 
    return (
        <>
            {existion ? (
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
                                height="151"
                                sx={{ width: 151 }}
                                image={`http://localhost:3001//uploads/thumbnail/${product.thumbnail[0]}`}
                                alt={product.name}

                            />
                        </a>
                    </Link>
                    <Box sx={{ display: 'flex', flexDirection: 'row', }} width="100%">
                        <CardContent sx={{ flex: '1 0 auto', width: "70%", padding: "10px 0", textAlign: "left", paddingLeft: "10px" }} >
                            <Link href={`/product/${product._id}`}>
                                <a>
                                    <Typography component="div" variant="body1">
                                        {truncate(product.name, 50)}
                                    </Typography>
                                </a>
                            </Link>
                            <Rating value={product.rate} readOnly size="small" />
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {truncate(product.description, 100)}
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
                                            setCount(p => p + 1)
                                        }} ><Add /></Button>
                                        <Button variant="contained" sx={{ width: { sm: "100%", md: "50%" } }} >{getCount}</Button>
                                        <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                                            setCount(p => {
                                                if(p == 1) {
                                                    setExistion(false)
                                                }
                                                return p - 1
                                            })
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
            ) : null}

        </>

    )
}



export default ProductCard