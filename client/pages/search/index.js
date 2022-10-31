import HomeLayout from '../../components/HomeLayout'
import MainLayout from '../../components/MainLayout'
import SearchBody from '../../components/Search/SearchBody';
import SearchTemplate from '../../components/Search/SearchTemplate';
import { getAllBrands, getAllCategories, getAllProducts } from "../../services/product";


const search = ({ categories, productPerPage, numberOfProducts, brands, latestProducts }) => {
    return (
        <>
            <SearchTemplate brands={brands} categories={categories}>
                <SearchBody products={latestProducts}/>
            </SearchTemplate>
        </>
    )
}

export const getServerSideProps = async (context) => {
    console.log("getServerSideProps is on the way..........")
    const { data: categories } = await getAllCategories();
    const { data: brands } = await getAllBrands();
    try {
        let latestProducts = []
        let numberOfProducts = 0
        let productPerPage = 1


        //getAllProducts(Page | limit | sort | searchQuery | category | price | discount | brand)
        const { data: allLatestProducts } = await getAllProducts(context.query.page || 1, 8, context.query.sort || "latest", context.query.search || "", context.query.category || "", false, context.query.price || "", context.query.discount || "", context.query.brand || "")
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

