import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";

import { createProduct } from "../../services/adminDashboard"; 
import { toastNotif } from "../../helpers/tools";
import ProductForm from "./ProductForm";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {Clear} from "@mui/icons-material"
import styled from "@emotion/styled";
import { ViewProductsContext } from "../../context/context";


const StyledBox = styled(Box)(({theme}) => ({

		position: 'absolute',
		top: '50%',
		left: '50%',
		wdith: "auto",
		minWidth : "650px",
		maxWidth: "100%",
		maxHeight : "100vh",
		overflowY : "auto",
		height : "auto",
		[theme.breakpoints.down('sm')]: {
			minWidth: "100%",
		},
		transform: 'translate(-50%, -50%)',
		boxShadow: 24,
		padding: "4%",
		borderRadius: 20,
		backgroundColor :"white"
 
}))

function AddProduct({open,setOpen}) {

	const {brands,getSelectedCategories,categories,onSubmit,setSelectedCategories,setThumbnail} = useContext(ViewProductsContext)
	const [getAllCategories, setCategories] = useState([categories]);
	const [getAllBrands, setBrands] = useState([]);

	const [product, setProduct] = useState({
		name :"",
		price: '',
		discount: '',
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

	const refreshStates = () => {
		setProduct({
			name :"",
			price: '',
			discount: '',
			brand : "",
			description : "",
			amount : ""
		})
		setSelectedCategories([])
		setThumbnail([])
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		onSubmit(product)
		// refreshStates()
	}
	
	return (
		<Modal open={open} aria-labelledby="modal-modal-title" 
		aria-describedby="modal-modal-description" onClose={() => {
			setOpen(false)
		}}>
		<StyledBox>
	
			<Clear sx={{position : "absolute",top : "4px",left : "4px" ,color : "gray",margin :"5px",}} onClick={() => {
				setOpen(false)
			}}/>
			<ProductForm setThumbnail={setThumbnail}  setOpen={setOpen} onSubmit={handleSubmit}  removeCategory={removeCategory} onProductChange={onProductChange} getAllCategories={getAllCategories} getAllBrands={getAllBrands} addCategory={addCategory} product={product} getSelectedCategories={getSelectedCategories}/>
		</StyledBox>
		</Modal>
	);
}


export default AddProduct;
