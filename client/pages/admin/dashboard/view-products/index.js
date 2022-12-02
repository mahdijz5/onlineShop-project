import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";


import MainLayout from "../../../../layouts/MainLayout";
import AdminLayout from "../../../../layouts/AdminLayout";
import { AdminDashboardContext, ViewProductsContext } from "../../../../context/context";
import ProductTable from "../../../../components/Admin/ProductTable";
import { Fab, Stack } from "@mui/material";
import { Add, Search } from "@mui/icons-material";
import SearchPanel from "../../../../components/Search/SearchPanel";
import { getAllBrands, getAllCategories, getAllProducts } from "../../../../services/product";
import AppPagination from "../../../../components/ui/Pagination";
import AddProduct from "../../../../components/Admin/addProduct";
import { createProduct, editProduct } from "../../../../services/adminDashboard";
import { toastNotif } from "../../../../helpers/tools";
import EditProduct from "../../../../components/Admin/EditProduct";

const viewProducts = ({ products: getAllOfProducts, categories, productPerPage, numberOfProducts, brands }) => {
    const router = useRouter()
    const [products, setProducts] = useState([])
    const [getNumberOfProducts,setNumberOfProducts] = useState(numberOfProducts)
    const [openSearch, setOpenSearch] = useState(false)
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const [openEditProduct, setOpenEditProduct] = useState({status  : false , id : ""})
    const [getSelectedCategories, setSelectedCategories] = useState([]);
    const [getThumbnail,setThumbnail] = useState([])

    useEffect(() => {
        setProducts(getAllOfProducts)
        setNumberOfProducts(numberOfProducts)
    }, [])

    console.log(getSelectedCategories)
    const onSubmit = async(product) => {

		try {
		const data = new FormData()
		data.set("name" , 	product.name)
		data.set("price" , 	product.price)
		data.set("discount",product.discount)
		data.set("amount" , product.amount)
		data.set("description" , product.description)
		data.set("brand" , product.brand)
		data.set("categories" , getSelectedCategories)
		getThumbnail.map((file) => {
			data.append("image" , file)
		})
		const response =await createProduct(data)
        const { data: Allproducts } = await getAllProducts(router.query.page || 1, 10,"",router.query.search || "", router.query.categories || "",false,router.query.price||"",router.query.discount||"",router.query.brand||"")
		setProducts([...Allproducts.products])
        console.log([...Allproducts.products])
        setNumberOfProducts((prev) => prev+1)
        toastNotif(response.data.message, response.status, 0);
		} catch (error) {
            console.log(error)
			if(error.response.data.message) {
			toastNotif(error.response.data.message, error.response.status, 0);
			}
		}

	};

    const onSubmitEdit = async(product) => {

		try {
		const data = new FormData()
		data.set("name" , 	product.name)
		data.set("price" , 	product.price.low)
		data.set("discount",product.discount)
		data.set("amount" , product.amount)
		data.set("description" , product.description)
		data.set("brand" , product.brand)
		data.set("categories" , getSelectedCategories)
		getThumbnail.map((file) => {
			data.append("image" , file)
		})
		const response =await editProduct(data , openEditProduct.id)
        const { data: Allproducts } = await getAllProducts(router.query.page || 1, 10, router.query.search || "", router.query.categories || "",false,router.query.price||"",router.query.discount||"",router.query.brand||"")
		setProducts([...Allproducts.products])
        setNumberOfProducts((prev) => prev+1)
        toastNotif(response.data.message, response.status, 0);
		} catch (error) {
            console.log(error)
			if(error.response.data.message) {
			toastNotif(error.response.data.message, error.response.status, 0);
			}
		}

	};

    return (
        <ViewProductsContext.Provider value={{
            getSelectedCategories,
            categories,
            brands,
            onSubmit,
            onSubmitEdit,
            setSelectedCategories,
            setThumbnail
        }}>
            <ProductTable products={products} setOpenEdit={setOpenEditProduct} />
            <AppPagination numberOfItems={getNumberOfProducts} itemPerPage={productPerPage} />
            <SearchPanel open={openSearch} setOpen={setOpenSearch} pathBase={router.pathname} categories={categories} brands={brands} maxPrice={9000000000} />
            <AddProduct   open={openAddProduct} setOpen={setOpenAddProduct}/>
            <EditProduct open={openEditProduct} setOpen={setOpenEditProduct}/>
            <Stack sx={{ right: {xs: "10px",sm : "50px"}, bottom: {xs: "10px",sm : "50px"}, position: "fixed" }} spacing={2}>
                <Fab color="warning"   onClick={() => {
                    setOpenSearch(true)
                }}>
                    <Search />
                </Fab>
                <Fab color="success" onClick={() => {
                    setOpenAddProduct(true)
                }}>
                    <Add />
                </Fab>
            </Stack>
        </ViewProductsContext.Provider>
    );
};

export const getServerSideProps = async (context) => {
    const { data: categories } = await getAllCategories();
    const { data: brands } = await getAllBrands();
    try {
        let products = []
        let numberOfProducts = 0
        let productPerPage = 1


        //getAllProducts(Page | limit | sort | searchQuery | category | price | discount | brand)
        const { data: Allproducts } = await getAllProducts(context.query.page || 1, 10, context.query.sort , context.query.search || "", context.query.categories || "",false,context.query.price||"",context.query.discount||"",context.query.brand||"")
        products = [...Allproducts.products]
        numberOfProducts = Allproducts.numberOfItems
        productPerPage = Allproducts.itemPerPage

        return {
            props: {
                products,
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

viewProducts.getLayout = (page) => {
    return (
        <MainLayout>
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    );
};

export default viewProducts;
