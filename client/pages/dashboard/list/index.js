import React from 'react'
import List from '../../../components/dashboard/List'
import Meta from '../../../components/Meta'
import DashboardLayout from '../../../layouts/DashboardLayout'
import MainLayout from '../../../layouts/MainLayout'

const userList =() => {
  return (
    <>
      <Meta title="لیست علاقمندی" />
      <List/>
    </>
  )
}

userList.getLayout = (page) => {
  return (
    <MainLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </MainLayout>
  )
}

export default userList