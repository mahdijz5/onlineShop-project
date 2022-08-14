import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

import { createProduct } from "../../../../services/adminDashboard";
import AdminLayout from "../../../../components/Admin/AdminLayout";
import MainLayout from "../../../../components/MainLayout";
import styles from "../../../../styles/admin/AddProduct.module.css";
import { AdminDashboardContext } from "../../../../context/context";
import {
	getAllCategories,
	getAllBrands,
} from "../../../../services/adminDashboard";
import { faX } from "@fortawesome/free-solid-svg-icons";
const CKEditor = dynamic(() => import("../../../../components/CKEditor"), {
	ssr: false,
});

function addProduct({ categories, brands }) {
	const router = useRouter()
	const { setPoint,toastNotif } = useContext(AdminDashboardContext);

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
			<form
				className={`row w-100 h-100 border-1 ${styles.addProductContainer}`}
				onSubmit={(e) => {
					onSubmit(e)
				}}
			>
				<div className="col-md-3 position-relative h-25  p-5 text-center">

						<div>
							
						<label   htmlFor="formFile" className="w-100 mb-3">
							<a className="btn"><img  src="/icon/add.png" alt="" className="w-100" /></a>
						</label>
						<input name="thumbnail" type="file" id="formFile" hidden onChange={(e) => {
							setThumbnail(e.target.files[0])
						}} />
						</div>
					<h4 className={styles.lableInput}>قیمت :</h4>
					<input
						type="number"
						name="price"
						className={`form-control ${styles.input}`}
						onChange={(e) => {
							onProductChange(e);
						}}
						placeholder="لطفا قیمت محصول را وارد کنید"
					/>
					<h4 className={styles.lableInput}>درصد تخفیف :</h4>
					<input
						type="number"
						name="discount"
						className={`form-control ${styles.input}`}
						placeholder=" *درصد تخفیف را وارد کنید"
						onChange={(e) => {
							onProductChange(e);
						}}
					/>

					{product.discount != 0 ? (
						<div>
							<h3 className="m-0 mt-3">
								{setPoint(
									product.price - (product.price * product.discount) / 100
								)}
							</h3>
							<h4 className={`text-center priceWithDiscount`}>
								{setPoint(product.price)}
							</h4>
						</div>
					) : (
						<h3 className="mt-3">{setPoint(product.price)}</h3>
					)}
				</div>

				<div className="col-md-9">
					<h4 className={styles.lableInput}>نام :</h4>
					<input className={`form-control ${styles.input}`} name="name" placeholder="نام محصول را وارد کنید" onChange={(e) => {
							onProductChange(e);
						}}/>
					<h4 className={styles.lableInput}>برند :</h4>
					<select
						className={`form-control ${styles.input}`}
						name="brand"
						onChange={(e) => {
							onProductChange(e);
						}}
					>
						<option value="11">برند محصول را انتخاب کنید</option>
						{getAllBrands
							? getAllBrands.map((brand, index) => (
									<option key={index}>{brand.title}</option>
						))
							: null}
					</select>
					<h4 className={styles.lableInput}>دسته :</h4>
					<div className="mb-5">
						<select
							className={`form-control ${styles.input} mb-2`}
							onChange={(event) => {
								addCategory(event);
							}}
						>
							<option>دسته ایی برای محصول خود انتخاب کنید</option>
							{getAllCategories
								? getAllCategories.map((cate, index) => (
										<option key={index}>{cate.title}</option>
								  ))
								: null}
						</select>
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
					<div></div>

					<CKEditor
						data="<ul> <li>اندازه : 1930/565</li> </ul>"
						config={{
							language: "fa",
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							const e = {
								target: {
									name: "description",
									value: data,
								},
							};
							onProductChange(e);
						}}
					/>
				</div>
				<button type="submit" className="btn btn-success">تایید</button>
			</form>
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
