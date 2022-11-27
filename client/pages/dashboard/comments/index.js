import React from 'react'
import Comments from '../../../components/dashboard/Comments'
import Meta from '../../../components/Meta' 
import DashboardLayout from '../../../layouts/DashboardLayout'
import MainLayout from '../../../layouts/MainLayout'

function myComments() {
    return (
        <>
            <Meta title="نظرات شما" />
        <Comments/>
        </>
    )
}

myComments.getLayout = (page) => {
    return (
        <MainLayout>
            <DashboardLayout>{page}</DashboardLayout>
        </MainLayout>
    )
}

export default myComments