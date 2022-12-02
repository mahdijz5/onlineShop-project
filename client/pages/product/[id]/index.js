import { Divider, Stack } from '@mui/material'
import MainLayout from '../../../layouts/MainLayout'
import ProductLayout from '../../../layouts/ProductLayout'
import Meta from '../../../components/Meta'
import ProductBody from '../../../components/Product/ProductBody'
import ProductComments from '../../../components/Product/ProductComments'
import RelatedSwiper from '../../../components/Swipers/RelatedSwiper'
import { getComments, getRelatedProducts, getSingleProduct } from '../../../services/product'

function product({ product, relatedProducts, comments }) {
    return (
        <>
            <Meta title={product.name} />
            <Stack>
                <ProductBody product={product} />
                <RelatedSwiper products={relatedProducts} />
                <Divider />
                <ProductComments productId={product._id} comments={comments} />
            </Stack>
            
        </>
    )
}

export const getServerSideProps = async (context) => {
    let categories = []

    const { data: product } = await getSingleProduct(context.query.id)
    product.product.categories.map((c) => {
        categories.push(c.title)
    })

    // page,limit,categories,brand
    const { data: relatedProducts } = await getRelatedProducts(context.query.page || 1, 8, categories, product.product.brand.title)
    const { data: comments } = await getComments(context.query.id)
    return {
        props: {
            product: product.product,
            relatedProducts: relatedProducts.products,
            comments: comments.comments
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