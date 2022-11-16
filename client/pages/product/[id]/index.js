import { Divider, Stack } from '@mui/material'
import { useRouter } from 'next/router'
import  { useEffect } from 'react'
import MainLayout from '../../../layouts/MainLayout'
import ProductLayout from '../../../layouts/ProductLayout'
import Meta from '../../../components/Meta'
import ProductBody from '../../../components/Product/ProductBody'
import ProductComments from '../../../components/Product/ProductComments'
import RelatedSwiper from '../../../components/Swipers/RelatedSwiper'
import { getAllProducts, getSingleProduct } from '../../../services/product'

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
                        <RelatedSwiper/>
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

         //getAllProducts(Page | limit | sort | searchQuery | category | price | discount | brand)
        const { data: product } = await getSingleProduct(context.query.id)
        const { data: allLatestProducts } = await getAllProducts(context.query.page || 1, 8, "latest" , "", context.query.category || "",false,context.query.price||"",context.query.discount||"",context.query.brand||"")

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