import { Divider, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import  { useEffect } from 'react'
import MainLayout from '../../../components/Layouts/MainLayout'
import ProductLayout from '../../../components/Layouts/ProductLayout'
import Meta from '../../../components/Meta'
import ProductBody from '../../../components/Product/ProductBody'
import ProductComments from '../../../components/Product/ProductComments'
import RelatedRow from '../../../components/Product/RelatedRow'
import { getSingleProduct } from '../../../services/product'

function product({ product }) {
    const router = useRouter()
    useEffect(() => {
        if (!product || product == undefined) {
            router.replace("/404")
        }
    }, [])
    return (
        <>
            <Meta title={product.name} />

            {product || product != undefined ? (
                <>
                    <Stack>
                        <ProductBody product={product} />
                        <Divider />
                        <RelatedRow/>
                        <Divider />
                        <ProductComments />
                    </Stack>
                </>
            ) :
                router.replace("/404")
            }

        </>
    )
}

export const getServerSideProps = async (context) => {
    console.log(context.query)
    try {
        const { data: product } = await getSingleProduct(context.query.id)

        return {
            props: {
                product: { ...product.product }
            }
        }
    } catch (error) {
    }
    return {
        props: {
            product: false
        }
    }
}


product.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            <ProductLayout>{page}</ProductLayout>
        </MainLayout>
    )
}

export default product