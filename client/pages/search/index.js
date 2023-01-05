import HomeLayout from '../../layouts/HomeLayout'
import MainLayout from '../../layouts/MainLayout'
import Meta from '../../components/Meta';
import SearchBody from '../../components/Search/SearchBody';
import SearchContainer from '../../containers/SearchContainer';
import { getAllBrands, getAllCategories, getAllProducts } from "../../services/product";


const search = ({ categories, brands }) => {
    return (
        <>
            <Meta title="جستجو"/>
            <SearchContainer brands={brands} categories={categories}>
                <SearchBody productPerPage={4}/>
            </SearchContainer>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const { data: categories } = await getAllCategories();
    const { data: brands } = await getAllBrands();
    return {
        props: {
            brands: brands.brands,
            categories: categories.categories,
        },
    };
};


search.getLayout = function getLayout(page) {
    return (
        <MainLayout>
            <HomeLayout>{page}</HomeLayout>
        </MainLayout>
    )
}


export default search;

