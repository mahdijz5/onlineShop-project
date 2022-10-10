import { CleaningServices, Delete, Edit } from '@mui/icons-material';
import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import _ from "lodash"

import {  setPoint, toastNotif } from '../../helpers/tools';
import { removeSelectedProducts } from '../../services/adminDashboard';
import Confirmation from '../ui/Confirmation';

function ProductTable({ products : allProducts, noCheckBox, productPerPage, amount, setAmount, onAmountChange, onAmountSubmit }) {
    const router = useRouter()
    const [selectedProducts, setSelectedProducts] = useState([])
    const [open,setOpen] = useState(false)
    const [products,setProducts] = useState([])
    useEffect(() => {
        setProducts(allProducts)
    },[allProducts]) 
    const checkIt = (id) => {
        let result = false
        selectedProducts.map(p => {
            if (id == p) {
                result = true
            }
        })
        return result
    }

    const selectProduct = (id) => {
        setSelectedProducts((p) => {
            const products = [...p]
            let isExist = false
            products.map((product, index) => {
                if (product == id) {
                    isExist = true
                    products.splice(index, 1)
                }
            })

            if (!isExist) products.push(id)
            return products;
        })
    }
    const handleDelete = async (products) => {
        try {
            const response = await removeSelectedProducts(products)
            if (response.status == 200) {
                router.push(router.asPath)
            }
            toastNotif(response.data.message, response.status, 1000)
        } catch (error) {
            if (error.response.data.message) {
                toastNotif(error.response.data.message, error.response.status, 0);
            }
        }
    }

    return (
        <>
            <Box my={2}>
            <Button sx={{ visibility: selectedProducts.length > 0 ? 'visible' : "hidden" }} color="error" variant="contained" onClick={() => {
                setOpen(true)
            }}><Delete /></Button>
            {" "}
            <Button sx={{ visibility: selectedProducts.length == 1 ? 'visible' : "hidden" }} color="warning" variant="contained" onClick={() => {
                router.push(`/admin/dashboard/edit-product/${selectedProducts[0]}`)
            }}><Edit /></Button>
            </Box>

            <TableContainer component={Paper} sx={{ marginBottom: "25px" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell color='error' >نام</TableCell>
                            <TableCell align="right">برند</TableCell>
                            <TableCell align="right">دسته</TableCell>
                            <TableCell align="right">قیمت</TableCell>
                            <TableCell align="right">تعداد</TableCell>
                            {!noCheckBox && <TableCell align="right"> </TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products ? products.map((product, index) => (
                            <TableRow
                                key={index}
                                hover
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                onClick={() => {
                                    if (!noCheckBox) {
                                        selectProduct(product._id)
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link href={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{product.brand.title}</TableCell>
                                <TableCell align="right">{product.categories.map((category, index) => (
                                    <div key={index}>
                                        <Link href={'/product/[id]'} as={`/brand/${product._id}`} >
                                            <a>{category.title}</a>
                                        </Link>
                                        <br />
                                    </div>
                                ))}</TableCell>
                                <TableCell align="right"> {product.discount == 0 ? (<Typography>
                                    {setPoint(product.price)}
                                </Typography>) : (<>
                                    <Typography className="mx-2  ">
                                        {setPoint(
                                            product.price - (product.price * product.discount) / 100
                                        )}
                                    </Typography>

                                    <Typography className={`mx-1 text-center  priceWithDiscount`}>
                                        {setPoint(product.price)}
                                    </Typography>
                                </>)}</TableCell>
                                <TableCell align="right">{product.amount}</TableCell>
                                {!noCheckBox && <TableCell align="right" ><Checkbox checked={checkIt(product._id)} onChange={() => {
                                    console.log("سلام")
                                }} /></TableCell>}
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell>
                                    <Typography>محصولی وجود ندارد</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <Confirmation title="ایا مطمعن هستید ؟" description={"ایا از پاک کردن این محصول اطمینان دارید ؟"} open={open} setOpen={setOpen} func={handleDelete} funcParameter={selectedProducts}/>
                </Table>
            </TableContainer>
        
        </>
    )
}

export default ProductTable