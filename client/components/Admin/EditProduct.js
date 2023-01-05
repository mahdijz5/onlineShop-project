import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";

import ProductForm from "./ProductForm";
import { Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Clear } from "@mui/icons-material"
import styled from "@emotion/styled";
import { getSingleProduct } from "../../services/product";
import { ViewProductsContext } from "../../context/context";


const StyledBox = styled(Box)(({ theme }) => ({

	position: 'absolute',
	top: '50%',
	left: '50%',
	wdith: "auto",
	minWidth: "650px",
	maxWidth: "100%",
	maxHeight: "100vh",
	overflowY: "auto",
	height: "auto",
	[theme.breakpoints.down('sm')]: {
		minWidth: "100%",
	},
	transform: 'translate(-50%, -50%)',
	boxShadow: 24,
	padding: "4%",
	borderRadius: 20,
	backgroundColor: "white"

}))

const EditProduct = ({ open, setOpen }) => {
	const {brands,getSelectedCategories,categories, onSubmitEdit: onSubmit,setSelectedCategories,setThumbnail} = useContext(ViewProductsContext)
	const [getAllCategories, setCategories] = useState([]);
	const [getAllBrands, setBrands] = useState([]);
	const [product, setProduct] = useState({
		name: "",
		price: '',
		discount: '',
		brand: "",
		description: ""
	});

	useEffect(() => {
		setCategories(categories);
		setBrands(brands);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (open.id != '') {
				const { data } = await getSingleProduct(open.id)
				const { name, price, discount, description, brand, categories, thumbnail, amount } = data.product
				setProduct({
					name,
					price : price.low,
					discount,
					description,
					brand: brand.title,
					thumbnail,
					amount,
				})
				setSelectedCategories(() => {
					let everyCategory = []
					for (const c of categories) {
						everyCategory.push(c.title)
					}
					return everyCategory
				})
			}
		}
		fetchData()
	}, [open])

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


	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(product)
		// refreshStates()
	}

	return (
		<>
			{open.status == true ? (
				<Modal open={open.status} aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description" onClose={() => {
						setOpen({ status: false, id: "" })
					}}>
					<StyledBox>

						<Clear sx={{ position: "absolute", top: "4px", left: "4px", color: "gray", margin: "5px", }} onClick={() => {
							setOpen({ status: false, id: "" })
						}} />
						<ProductForm thumbnail={product.thumbnail} setThumbnail={setThumbnail} edit={true} setOpen={setOpen} onSubmit={handleSubmit} removeCategory={removeCategory} onProductChange={onProductChange} getAllCategories={getAllCategories} getAllBrands={getAllBrands} addCategory={addCategory} product={product} getSelectedCategories={getSelectedCategories} />
					</StyledBox>
				</Modal>
			) : null}
		</>
	);
}


export default EditProduct;
