import HomeLayout from '../../layouts/HomeLayout'
import MainLayout from '../../layouts/MainLayout'
import Meta from '../../components/Meta';
import SearchBody from '../../components/Search/SearchBody';
import SearchContainer from '../../containers/SearchContainer';
import { getAllBrands, getAllCategories, getAllProducts } from "../../services/product";


const search = ({ categories, productPerPage, numberOfProducts, brands, latestProducts }) => {
    return (
        <>
            <Meta title="جستجو"/>
            <SearchContainer brands={brands} categories={categories}>
                <SearchBody products={latestProducts}/>
            </SearchContainer>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { data: categories } = await getAllCategories();
    const { data: brands } = await getAllBrands();
    try {
        let latestProducts = []
        let numberOfProducts = 0
        let productPerPage = 1


        //getAllProducts(Page | limit | sort | searchQuery | category | price | discount | brand)
        const { data: allLatestProducts } = await getAllProducts(context.query.page || 1, 222, context.query.sort || "latest", context.query.search || "", context.query.category || "", false, context.query.price || "", context.query.discount || "", context.query.brand || "")
        latestProducts = [...allLatestProducts.products]

        return {
            props: {
                latestProducts,
                numberOfProducts,
                productPerPage,
                brands: brands.brands,
                categories: categories.categories,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                products: [],
                numberOfProducts: 0,
                productPerPage: 1,
                brands: brands.brands,
                categories: categories.categories,
            },
        };
    }
};


search.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            <HomeLayout>{page}</HomeLayout>
        </MainLayout>
    )
}


export default search;

