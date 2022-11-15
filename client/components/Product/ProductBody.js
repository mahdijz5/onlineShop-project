import styled from '@emotion/styled'
import { CheckCircleOutline, Clear, Favorite, ShoppingCart } from '@mui/icons-material'
import { Box, Button, Chip, Divider, IconButton, Paper, Rating, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { setPoint } from '../../helpers/tools'
import ThumbnailSwipre from '../ui/ThumbnailSwipre'

const FixedIcons = styled(Stack)({
  position: "fixed",
  bottom: "10px",
  right: "10px",
})

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "50%",
  height: "100%"
}))

function ProductBody({ product }) {
  console.log(product)
  useEffect(() => {
    const d = document.getElementsByClassName("desc")[0]
    d.innerHTML = product.description
  }, [])

  return (
    <>
      <Stack direction={{lg : "row",xs : "column"}} gap="20px" px="75px" py="60px" alignItems="stretch">
        <Box width={{lg : "40%",xs : "100%"}}>
          <ThumbnailSwipre thumbnail={product.thumbnail} width="100%" height="600px" />
        </Box>
        <Stack width={{lg : "60%",xs : "100%"}} gap="25px" alignItems="stretch">
          <Box>
            <Typography color="text.primary" variant="h4">{product.name}</Typography>
            <Divider />
          </Box>
          <Stack direction="row" height="100%" alignItems="stretch">
            <Box width="50%" height="100%">
              <Stack gap='10px'>
                <Box>
                  {product.categories.length > 0 ? product.categories.map((c, index) => (
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
            <StyledPaper elevation="3" >
              <Stack height="100%" p="15px">
                <Box height="90%" textAlign="center">
                  {product.discount > 0 ? (
                    <>
                      <Typography variant='h5' className="priceWithDiscount">{setPoint(product.price)}</Typography>
                      <Typography variant='h5' >{setPoint(product.price - ((product.price * product.discount) / 100))}</Typography>
                    </>
                  ) : (
                    <Typography variant='h5'>{setPoint(product.price)}</Typography>
                  )}
                  <Divider />
                  {product.discount > 20 ? (
                    <Typography py="10px" variant='body1' display="flex" justifyContent="center" alignItems="center"> موجود در انبار <CheckCircleOutline sx={{ color: "success.main" }} /></Typography>
                  ) : (
                    <Typography py="10px" variant='body1' display="flex" justifyContent="center" alignItems="center"> فقط 3 عدد در انبار باقی مانده است <Clear sx={{ color: "danger.main" }} /></Typography>
                  )}
                  <Divider />
                </Box>

                <Box role="interacable" height="10%">
                  <Button variant="contained" sx={{ width: "100%", height: "100%" }}>
                    افزودن به سبد خرید
                    <ShoppingCart />
                  </Button>
                </Box>
              </Stack>
            </StyledPaper>
          </Stack>
        </Stack>

      </Stack>

      <FixedIcons>
        <IconButton  >
          <Favorite />
        </IconButton>
        <IconButton>
          <ShoppingCart />
        </IconButton>
      </FixedIcons>
    </>
  )
}

export default ProductBody