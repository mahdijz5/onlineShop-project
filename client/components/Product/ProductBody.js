import styled from '@emotion/styled'
import { Add, CheckCircleOutline, Clear, Favorite, FavoriteBorder, Remove, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material'
import { Box, Button, Chip, Divider, Fab, Paper, Rating, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { General } from '../../context/context'
import { setPoint, toastNotif } from '../../helpers/tools'
import useEditCart from '../../hooks/useEditCart'
import { addProductToList } from '../../services/user'
import ThumbnailSwipre from '../Swipers/ThumbnailSwipre'

const FixedIcons = styled(Stack)({
  position: "fixed",
  bottom: "10px",
  right: "10px",
  gap: "10px"
})

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "50%",
  height: "100%"
}))

const DiscountBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.danger.main,
  color: "white",
  borderRadius: "2px",
  display: "inline-block",
  position: "absolute",
  padding: "3px 10px",
  top: 10,
  left: 10,
}))


function ProductBody({ product }) {
  const initialState = { count: 1 };
  const { user, setRefresh } = useContext(General)
  const [existInCart, setExistInCart] = useState(false)
  const [existInList, setExistInList] = useState(false)
  const [count,setCount] = useState(0)
  const avoidRunningTwice = useRef(false);
  const value = useEditCart(count,0,1000,product._id,user)
  console.log(count)
  console.log(user)
  useEffect(() => {
    if(avoidRunningTwice.current) return 
    avoidRunningTwice.current = true
    const d = document.getElementsByClassName("desc")[0]
    d.innerHTML = product.description
    if(user.name != undefined) {
      user.cart.map((p) => {
        if(p == product._id) {
          setExistInCart(true)
          setCount((per) => per+1)
        }
      })
      user.list.map((p) => {
        if(p == product._id) {
          setExistInList(true)
        }
      })
    }else {
      localStorage.getItem('cart')?.split(',').map((p) => {
        if(p == product._id) {
          setExistInCart(true)
          setCount((per) => per+1)
        }
      })
    }
  }, [])
 
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
      <Stack direction={{ lg: "row", xs: "column" }} gap="20px" px="75px" py="60px" alignItems="stretch">
        <Box width={{ lg: "40%", xs: "100%" }}>
          <ThumbnailSwipre thumbnail={product.thumbnail} width="100%" height="600px" />
        </Box>
        <Stack width={{ lg: "60%", xs: "100%" }} gap="25px" alignItems="stretch">
          <Box>
            <Typography color="text.primary" variant="h4">{product.name}</Typography>
            <Divider />
          </Box>
          <Stack direction="row" height="100%" alignItems="stretch">
            <Box width="50%" height="100%">
              <Stack gap='10px'>
                <Box>
                  {product.categories || product.categories.length > 0 ? product.categories.map((c, index) => (
                    <Chip label={c.title} key={index} />
                  )) : null}
                </Box>
                <Rating name="read-only" value={product.rate} readOnly size="small" />
                <Typography mb="8px" ml="7px" color="text.primary" variant="subtitle1">برند : {product.brand.title}</Typography>
              </Stack>
              <Box>
                <Typography ml="7px" color="text.primary" variant="subtitle1" fontWeight="800">مشخصات</Typography>
                <Box className="desc"></Box>
              </Box>
            </Box>
            <StyledPaper elevation={3} >
              <Stack height="100%" p="15px" position="relative">
                <Box height="90%" textAlign="center" >
                  {product.discount > 0 ? (
                    <>
                      <Typography variant='h5' className="priceWithDiscount">{setPoint(product.price.low)}</Typography>
                      <Typography variant='h5' >{setPoint(product.price.low - ((product.price.low * product.discount) / 100))}</Typography>
                    </>
                  ) : (
                    <Typography variant='h5'>{setPoint(product.price.low)}</Typography>
                  )}
                  <Divider />
                  {product.amount > 20 ? (
                    <Typography py="10px" variant='body1' display="flex" justifyContent="center" alignItems="center"> موجود در انبار <CheckCircleOutline sx={{ color: "success.main" }} /></Typography>
                  ) : (
                    <Typography py="10px" variant='body1' display="flex" justifyContent="center" alignItems="center"> فقط {product.amount} عدد در انبار باقی مانده است <Clear sx={{ color: "danger.main" }} /></Typography>
                  )}
                  <Divider />

                  <Stack direction="row" justifyContent="center" alignItems="center" mt="40px">
                    <img src='/icon/support.svg' style={{width : "60px"}}/> <Typography variant="subtitle1" color={grey[500]}>پیشتیبانی 24 ساعته</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <img src='/icon/days-return.svg' style={{width : "60px"}}/> <Typography variant="subtitle1" color={grey[500]}>هفت روز ضمانت بازگشت</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    <img src='/icon/express-delivery.svg' style={{width : "60px"}}/> <Typography variant="subtitle1" color={grey[500]}>امکان تحویل سریع</Typography>
                  </Stack>
                </Box>

                <Box role="interaction box" height="10%">
                  {existInCart ? (
                    <Stack direction={{ sm: "column", md: "row" }} gap="5px">
                      <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                         setCount((p) => p+1)
                      }} ><Add /></Button>
                      <Button variant="contained" sx={{ width: { sm: "100%", md: "50%" } }}>{count}</Button>
                      <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                      setCount((p) => {
                        if(p==1) {
                          setExistInCart(false)
                        }
                        return p-1
                      })
                      }} ><Remove /></Button>
                    </Stack>
                  ) : (
                    <Button variant="contained" sx={{ width: "100%", height: "100%" }} onClick={() => {
                       setCount((p) => p+1)
                       setExistInCart(true)
                    }}>
                      افزودن به سبد خرید
                      <ShoppingCart />
                    </Button>
                  )}

                  <DiscountBox><Typography variant="subtitle2" color="white">{product.discount}% تخفیف</Typography></DiscountBox>
                </Box>
              </Stack>
            </StyledPaper>
          </Stack>
        </Stack>

      </Stack >
      <FixedIcons>
        <Fab color="secondary" onClick={() => {
          
        }}>
          {!existInCart ? <ShoppingCartOutlined /> : <ShoppingCart />}
        </Fab>
        <Fab color="primary" disabled={user.name == undefined ? true : false} onClick={() => {
          addProductToList(product._id, (data, err) => {
            console.log(err)
            if (err) {
              toastNotif(err.response.data.message, err.status, 0)
            } else {
              if (data.data.action == "remove") {
                setExistInList(false)
              } else if (data.data.action == "add") {
                setExistInList(true)
              }
            }
          })
        
        }} >
          {!existInList ? <FavoriteBorder /> : <Favorite />}
        </Fab>
      </FixedIcons>

    </>
  )
}

export default ProductBody