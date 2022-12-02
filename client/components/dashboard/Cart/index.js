import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ProductCard from '../ProductCard'
import { General } from '../../../context/context'
import { getCart } from "../../../services/user"
import EmptyCart from "../../EmptyCart"
import PurchaseCard from "./purchaseCard"
import { setPoint, toastNotif } from "../../../helpers/tools"
import styled from "@emotion/styled"
import { grey } from "@mui/material/colors"
import { createOrder } from "../../../services/order"
import { ToastContainer } from "react-toastify"



const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "unset",
  border: `1px solid ${grey[300]}`,
  width: "100%",
}))

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "20px"
}))

const Cart = () => {
  const { user: singleUser, refresh,setRefresh } = useContext(General)
  const [user, setUser] = useState({})
  const [cart, setCart] = useState([])
  const [purchaseDetail, setPurchaseDetail] = useState({
    cost: 0,
    discountedCost: 0,
    benefit: 0
  })
  useEffect(() => {
    let myCart = []
    if(user.cart != undefined) {
      let idlist = []
      user.cart.map(p => idlist.push(p._id))
      myCart = idlist
    }else {
      myCart = localStorage.getItem("cart") ? localStorage.getItem("cart").split(',') : []
    }
    getCart(myCart).then((c) => {
      setCart(c.data.products)
      let details = {
        cost : 0,
        discountedCost : 0,
        benefit : 0,
      }
      c.data.products.map(p => {
        details.cost += (p.price.low) * p.count
        details.discountedCost += (p.price.low - (p.price.low * p.discount) / 100) * p.count
        details.benefit += ((p.price.low * p.discount) / 100) * p.count
      })
      setPurchaseDetail(details)
    }).catch(err => {
      if (err.response.status == 404) {
        // setCart([])
        setRefresh((p) => !p)
      }
    })
    setUser(singleUser)
  }, [refresh])

  const submitOrder = async() => {
    setRefresh((p) => !p)
    let myCart = []
    if(user.cart != undefined) {
      let idlist = []
      user.cart.map(p => idlist.push(p._id))
      myCart = idlist
    }else {
      myCart = localStorage.getItem("cart") ? localStorage.getItem("cart").split(',') : []
    }
    createOrder(myCart,(data,err) => {
      if(err) {
        if(err.response.data.message != undefined) {
          toastNotif(err.response.data.message,err.response.status,0)
        }
      }else {
        toastNotif(data.data.message,data.status,0)
        localStorage.setItem('cart','')
      }
    })
    
  } 

  return (
    <Stack gap="20px" textAlign="center" alignItems='center'>
      {cart.length > 0 ? (
        <StyledCard>
        <Stack >
          <FlexBox>
            <Typography variant="body2">مجموع قیمت : </Typography>
            <Typography variant="body2" className="priceWithDiscount">{setPoint(purchaseDetail.cost)} تومان</Typography>
          </FlexBox>
          <Divider />
          <FlexBox>
            <Typography variant="body2">قیمت خرید :</Typography>
            <Typography variant="body2">{setPoint(purchaseDetail.discountedCost)} تومان</Typography>
          </FlexBox>
          <Divider />
          <FlexBox>
            <Typography variant="body2">سود :</Typography>
            <Typography variant="body2" sx={{border : "1px solid success.main"}}>{setPoint(purchaseDetail.benefit)} تومان</Typography>
          </FlexBox>
          <Divider />
          <Button variant="outlined" sx={{ borderTopRightRadius: "unset", borderTopLeftRadius: "unset" }} onClick={() => {submitOrder()}}>
            خرید
          </Button>
        </Stack>
      </StyledCard>
      ) : null}
      {

        cart.length > 0 ? cart.map((product, index) => (
          <ProductCard product={product} user={user} key={index} reducerOption />

        )) : (
          <>
            <EmptyCart width={"100px"} height={"100px"} />
            <Typography variant="subtitle2">سبد خرید شما خالی است</Typography>
          </>
        )
      }
      <ToastContainer/>
    </Stack>
  )
}

export default Cart