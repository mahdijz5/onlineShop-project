import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";

import { createProduct } from "../../../../services/adminDashboard";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import MainLayout from "../../../../components/MainLayout";
import styles from "../../../../styles/admin/Product.module.css";
import {
	getAllCategories,
	getAllBrands,
} from "../../../../services/adminDashboard";
import { toastNotif } from "../../../../helpers/tools";
import ProductForm from "../../../../components/Admin/ProductForm";


function addProduct({ categories, brands }) {
	const router = useRouter()

	const [getAllCategories, setCategories] = useState([]);
	const [getAllBrands, setBrands] = useState([]);
	const [getSelectedCategories, setSelectedCategories] = useState([]);
	const [getThumbnail,setThumbnail] = useState()
	const [product, setProduct] = useState({
		name :"",
		price: 0,
		discount: 0,
		brand : "",
		description : ""
	});

	useEffect(() => {
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

	const onSubmit = async(e) => {
		e.preventDefault()
		try {
		const data = new FormData()
		data.set("name" , product.name)
		data.set("price" , product.price)
		data.set("discount" , product.discount)
		data.set("amount" , product.amount)
		data.set("description" , product.description)
		data.set("brand" , product.brand)
		data.set("categories" , getSelectedCategories)
		data.set("thumbnail" , getThumbnail)
		const response =await createProduct(data)
		router.replace(router.asPath);
		toastNotif(response.data.message, response.status, 1000);
		} catch (error) {
			if(error.response.data.message) {
			toastNotif(error.response.data.message, error.response.status, 0);
			}
		}

	};

	return (
		<div className={` h-100 ${styles.addProductBody}`}>
			<ProductForm onSubmit={onSubmit} setThumbnail={setThumbnail} removeCategory={removeCategory} onProductChange={onProductChange} getAllCategories={getAllCategories} getAllBrands={getAllBrands} addCategory={addCategory} product={product} getSelectedCategories={getSelectedCategories}/>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const { data: b } = await getAllBrands();
	const { data: c } = await getAllCategories();

	return {
		props: {
			brands: b.brands,
			categories: c.categories,
		},
	};
};

addProduct.getLayout = (page) => {
	return (
		<MainLayout>
			<AdminLayout>{page}</AdminLayout>
		</MainLayout>
	);
};

export default addProduct;
