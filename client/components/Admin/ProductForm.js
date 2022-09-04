import React from 'react'
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("../CKEditor.js"), {
	ssr: false,
});
import { FiCloudLightning, FiX } from 'react-icons/fi';

import Button from '../UiComponents/Button';
import styles from "../../styles/admin/Product.module.css";
import { setPoint } from '../../helpers/tools';


function ProductForm({ onSubmit,setThumbnail,removeCategory,onProductChange,getAllCategories,getAllBrands,addCategory,product,getSelectedCategories }) {
	return (
		<form
			className={`row w-100 pb-5 border-1 ${styles.addProductContainer}`}
			onSubmit={(e) => {
				onSubmit(e)
			}}
		>
			<div className="col-md-3 position-relative h-25  p-5 pb-0 text-center">

				<div>

					<label htmlFor="formFile" className="w-100 mb-3">
						<a className="btn"><img src="/icon/add.png" alt="" className="w-100" /></a>
					</label>
					<input name="thumbnail" type="file" id="formFile" hidden onChange={(e) => {
						setThumbnail(e.target.files[0])
					}} />
				</div>
				<h4 className={styles.lableInput}>تعداد :</h4>
						{console.log(product.brand.title)}
				<input
					type="number"
					name="amount"
					value={product.amount}
					onChange={(e) => {
						onProductChange(e);
					}}
					style={{fontSize : "15px"}}
					className={`form-control ${styles.input} mb-3`}
					placeholder="لطفا تعداد محصول را وارد کنید(پیشفرض:‌0)"
				/>
				<hr/>
				<h4 className={styles.lableInput}>قیمت :</h4>
						{console.log(product.brand.title)}
				<input
					type="number"
					name="price"
					value={product.price}
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
					value={product.discount }
					className={`form-control ${styles.input}`}
					placeholder=" *درصد تخفیف را وارد کنید"
					onChange={(e) => {
						onProductChange(e);
					}}
				/>

				{product.discount != 0 ? (
					<div>
						<h3 className="m-0 mt-2">
							{setPoint(
								product.price - (product.price * product.discount) / 100
							)}
						</h3>
						<h4 className={`text-center priceWithDiscount`}>
							{setPoint(product.price)}
						</h4>
					</div>
				) : (
					<h3 className="mt-2">{setPoint(product.price)}</h3>
				)}
			</div>

			<div className="col-md-9">
				<h4 className={styles.lableInput}>نام :</h4>
				<input className={`form-control ${styles.input}`} name="name" placeholder="نام محصول را وارد کنید" value={product.name} onChange={(e) => {
					onProductChange(e);
				}} />
				<h4 className={styles.lableInput}>برند :</h4>
				<select
					className={`form-control ${styles.input}`}
					name="brand"
					value={product.brand}
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
							<FiX/>
							<div className="d-inline-block">
								<span className="mx-2">{cate} </span>
							</div>
						</div>
					))}
				</div>
				<div></div>

				<CKEditor
					data={product.description}
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
			<Button type="submit" theme="light" className="me-auto ms-5 mt-3">تایید</Button>
		</form>
	)
}

export default ProductForm