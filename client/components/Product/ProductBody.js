import styled from '@emotion/styled'
import { Add, CheckCircleOutline, Clear, Favorite, FavoriteBorder, Remove, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material'
import { Box, Button, Chip, Divider, Fab, Paper, Rating, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { General } from '../../context/context'
import { addToCart, removeFromCart } from '../../helpers/action'
import { setPoint, toastNotif } from '../../helpers/tools'
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



function ProductBody({ product }) {
  const initialState = { count: 1 };
  const { user, setRefresh } = useContext(General)
  const [existInCart, setExistInCart] = useState(false)
  const [existInList, setExistInList] = useState(false)
  const [amount, dispatch] = useReducer(reducer, initialState);
  const changeCart = (action) => {
    console.log(amount.count)
    if (amount.count <= 0) {
      setExistInCart(false)
    }
    if (action == "increment") {
      if (amount.count !== product.amount) {
        addToCart(product._id, user, (res) => {

        })
      }
    } else {
      if (amount.count <= 1) {
        console.log(false)
        setExistInCart(false)
      }
      removeFromCart(product._id, user, (res) => {
      })
    }
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



  useEffect(() => {
    const d = document.getElementsByClassName("desc")[0]
    d.innerHTML = product.description
  }, [])
  useEffect(() => {
    localStorage.getItem('cart').split(',').map(p => {
      if (p == product._id) {
        setExistInCart(true)
        initialState.count++
      }
    })
    if (user.name != undefined) {
      console.log(user)
      user.list.map(p => {
        if (p._id == product._id) {
          setExistInList(true)
          return
        }
      })
    }

  }, [existInList, existInCart, user])

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
              <Stack height="100%" p="15px">
                <Box height="90%" textAlign="center">
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
                </Box>

                <Box role="interacable" height="10%">
                  {existInCart ? (
                    <Stack direction={{ sm: "column", md: "row" }} gap="5px">
                      <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                        dispatch({ type: 'increment' })
                        changeCart("increment")
                      }} ><Add /></Button>
                      <Button variant="contained" sx={{ width: { sm: "100%", md: "50%" } }}>{amount.count}</Button>
                      <Button variant="outlined" sx={{ width: { sm: "100%", md: "25%" } }} onClick={() => {
                        dispatch({ type: 'decrement' })
                        changeCart("decrement")
                      }} ><Remove /></Button>
                    </Stack>
                  ) : (
                    <Button variant="contained" sx={{ width: "100%", height: "100%" }} onClick={() => {
                      addToCart(product._id, user, (res) => {
                        toastNotif(res.message, res.status, 0)
                        if (res.status >= 200 && res.status < 300) {
                          setExistInCart(true)
                        }
                      })
                    }}>
                      افزودن به سبد خرید
                      <ShoppingCart />
                    </Button>
                  )}
                </Box>
              </Stack>
            </StyledPaper>
          </Stack>
        </Stack>

      </Stack >
      <FixedIcons>
        <Fab color="secondary" onClick={() => {
          addToCart(product._id, user, (res) => {
            toastNotif(res.message, res.status, 0)
            if (res.status >= 200 && res.status < 300) {
              setExistInCart(true)
            }
          })
          dispatch({ type: 'increment' })
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