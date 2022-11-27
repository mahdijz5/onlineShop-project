import { Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ProductCard from '../ProductCard'
import { General } from '../../../context/context'
import { getCart } from "../../../services/user"
import EmptyCart from "../../EmptyCart"




const Cart = ( ) => {
  const {user : singleUser,refresh} = useContext(General) 
  const [user,setUser] = useState({})
  const [cart,setCart] = useState([])
  useEffect(() => { 
      getCart(localStorage.getItem('cart')).then((c) => {
        setCart(c.data.products)
      }).catch(err => {
        if(err.response.status == 404) {
          setCart([])
        }
      })
      setUser(singleUser)      
  },[refresh])
  
  return (
    <Stack gap="20px" textAlign="center" alignItems='center'>
      {

        cart.length > 0 ?  cart.map((product, index) => (
          <ProductCard product={product} user={user} key={index} reducerOption/>
          
        )) : (
          <>
            <EmptyCart width={"100px"} height={"100px"}/>
          <Typography variant="subtitle2">سبد خرید شما خالی است</Typography>
          </>
        )
}
    </Stack>
  )
}

export default Cart