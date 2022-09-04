import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash"
import { DebounceInput } from 'react-debounce-input';
import { useRouter } from "next/router";


import MainLayout from "../../../../components/MainLayout";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import { AdminDashboardContext } from "../../../../context/context";
import { Secondary } from "../../../../helpers/color";
import styles from "../../../../styles/admin/Product.module.css";
import { getAllCategories, getAllProducts } from "../../../../services/adminDashboard";
import Pagination from "../../../../components/Pagination";
import ProductTable from "../../../../components/Admin/sidebarItems/ProductTable";

const viewProducts = ({ products: getAllProducts, categories, productPerPage, numberOfProducts, currentPage }) => {
    const router = useRouter()
    const { selectedProducts,selectProduct,getSelectedCategories,setSelectedCategories,removeCategory,addCategory,handleChangeSearch } = useContext(AdminDashboardContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        console.log(getAllProducts)
        setProducts(getAllProducts)
        if (router.query != {} && router.query.category != undefined && router.query.category != '') {
            setSelectedCategories(router.query.category.split(','))
        }
    }, [])



    

    return (
        <>
            <div className="w-100 text-center my-3">
                <DebounceInput debounceTimeout={1000} type="text" placeholder="جستجو کنید" onChange={handleChangeSearch} value={router.query.search} className="form-control d-inline-block text-center w-50" style={{
                    border: `1px solid ${Secondary}`
                }} />
                <select
                    className={`form-control ${styles.input} mb-2 w-25 d-inline-block`}
                    onChange={(event) => {
                        addCategory(event);
                    }}
                >
                    <option>دسته ایی برای محصول خود انتخاب کنید</option>
                    {categories
                        ? categories.map((cate, index) => (
                            <option key={index} >{cate.title}</option>
                        ))
                        : null}
                </select>
                <br />
                {getSelectedCategories.map((cate, index) => (
                    <div
                        key={index}
                        className={styles.selectedCategories + " d-inline-block"}
                        onClick={() => {
                            removeCategory(cate);
                        }}
                    >
                        <FontAwesomeIcon icon={faX} size={"xs"} />
                        <div className="d-inline-block">
                            <span className="mx-2">{cate} </span>
                        </div>
                    </div>
                ))}
            </div>
            <ProductTable products={products} currentPage={currentPage} productPerPage={productPerPage}  selectProduct={selectProduct} selectedProducts={selectedProducts}/>
            <Pagination numberOfItems={numberOfProducts} currentPage={currentPage} itemPerPage={productPerPage} />
        </>
    );
};

export const getServerSideProps = async (context) => {
    let products = []
    let numberOfProducts = 0
    let currentPage = 1
    let productPerPage = 1
    let Allcategories = []
    
    const { data: categories } = await getAllCategories();

    try {
        //getAllProducts(Page | limit | searchQuery | category)
        const { data: product } = await getAllProducts(context.query.page || 1 , 10 , context.query.search || "" , context.query.category || "");

        products= product.products
        numberOfProducts= product.numberOfItems
        currentPage= +context.query.page || +product.currentPage
        productPerPage= product.itemPerPage
        Allcategories= categories.categories
    } catch (error) {
        Allcategories= categories.categories
    }

    return {
        props: {
            products,
            numberOfProducts,
            currentPage,
            productPerPage,
            categories : Allcategories,
        },
    };
};

viewProducts.getLayout = (page) => {
    return (
        <MainLayout>
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    );
};

export default viewProducts;
