import React, { useContext } from 'react'
import Cart from '../../../components/dashboard/Cart'
import Meta from '../../../components/Meta'
import DashboardLayout from '../../../layouts/DashboardLayout'
import MainLayout from '../../../layouts/MainLayout'
const userCart = () => {

  return (
    <>
      <Meta title="سبد خرید" />
      <Cart />
    </>
  )
}

userCart.getLayout = (page) => {
  return (
    <MainLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </MainLayout>
  )
}

export default userCart 