import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";

import AdminLayout from "../../../../../components/Admin/AdminLayout";
import MainLayout from "../../../../../components/Layouts/MainLayout";
import {
    getAllCategories,
    getAllBrands,
    getSingleProduct,
    editProduct as editSingleProduct,
} from "../../../../../services/adminDashboard";
import { toastNotif } from "../../../../../helpers/tools";
import ProductForm from "../../../../../components/Admin/ProductForm";
import Meta from "../../../../../components/Meta";
import styles from "../../../../../styles/admin/Product.module.css";

const editProduct = ({ singleProduct, categories, brands }) => {
    const router = useRouter()

    const [getAllCategories, setCategories] = useState([]);
    const [getAllBrands, setBrands] = useState([]);
    const [getSelectedCategories, setSelectedCategories] = useState([]);
    const [getThumbnail, setThumbnail] = useState()
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        discount: 0,
        brand: "",
        description: ""
        
    });
    useEffect(() => {
        const allSelectedCategories = []
        singleProduct.categories.map((c) => {
            allSelectedCategories.push(c.title)
        })
        setSelectedCategories(allSelectedCategories)
        setProduct({...singleProduct , brand : singleProduct.brand.title})
        setCategories(categories);
        setBrands(brands);
    }, []);

    const addCategory = (e) => {
        setSelectedCategories((prev) => {
            return [...prev, e.target.value];
        });
    };

    const removeCategory = (cate) => {
        setSelectedCategories((prev) => {
            const prevCategories = [...prev];
            const removed = _.remove(prevCategories, (c) => {
                return c == cate;
            });
            return prevCategories;
        });
    };

    const onProductChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.set("name", product.name)
            data.set("price", product.price)
            data.set("discount", product.discount)
            data.set("description", product.description)
            data.set("brand", product.brand)
            data.set("categories", getSelectedCategories)
            data.set("thumbnail", getThumbnail)

            const response = await editSingleProduct(data,router.query.id)
            router.replace("/admin/dashboard/view-products");
            toastNotif(response.data.message, response.status, 1000);
        } catch (error) {
            console.log(error)
            if (error.response.data.message) {
                toastNotif(error.response.data.message, error.response.status, 0);
            }
        }

    };

    return (
        <>
            <Meta title={'My shop | ویرایش محصول'} />
            <div className={` h-100 ${styles.addProductBody}`}>
                <ProductForm onSubmit={onSubmit} setThumbnail={setThumbnail} removeCategory={removeCategory} onProductChange={onProductChange} getAllCategories={getAllCategories} getAllBrands={getAllBrands} addCategory={addCategory} product={product} getSelectedCategories={getSelectedCategories} />
            </div>

        </>
    )
}

export const getServerSideProps = async (context) => {
    try {
        const { data: b } = await getAllBrands();
        const { data: c } = await getAllCategories();
        const { data: p } = await getSingleProduct(context.query.id)

        return {
            props: {
                brands: b.brands,
                categories: c.categories,
                singleProduct: p.product,
            },
        };
    } catch (error) {
        console.log(error)
    }
};


editProduct.getLayout = (page) => {
    return (
        <MainLayout>
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    );
};

export default editProduct