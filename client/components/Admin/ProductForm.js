import React, { useEffect, useState, useTransition } from 'react'
import dynamic from "next/dynamic";
const CKEditor = dynamic(() => import("../CKEditor.js"), {
	ssr: false,
});
import {Add} from "@mui/icons-material"

import { setPoint } from '../../helpers/tools';
import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import ThumbnailSwiper from "../Swipers/ThumbnailSwipre"



function ProductForm({ setOpen,onSubmit, setThumbnail, removeCategory, onProductChange, getAllCategories, getAllBrands, addCategory, product, thumbnail, getSelectedCategories, edit }) {
	const [getThumbnail, setThumbnails] = useState([])
	const [isPending, startTransition] = useTransition()
	useEffect(() => {
		startTransition(() => {
			setThumbnails(thumbnail)
		})
	}, [thumbnail])
	return (
		<form
			className={`row w-100 pb-5 border-1 `}
			onSubmit={(e) => {
				onSubmit(e)
				setThumbnail([])
				setOpen({status : false , id : ""})
			}}
		>
			<Stack direction={{ sm: "column", md: "row" }} gap={2}>
				<Stack width='100%' spacing={2}>

					<Box display="flex" justifyContent={"center"}>


						{edit ?
							isPending ? null : (
								<Box position="relative">
									<ThumbnailSwiper thumbnail={getThumbnail} width={"200px"} height={"200px"} />
									<label htmlFor="formFile" >
										<a><Add sx={{position : "absolute",top : "0" , left : "0",zIndex : "3",backgroundColor:"white",borderRadius : "5px",cursor : "pointer"}} /> </a>
									</label>
								</Box>
							)
							: (
								<label htmlFor="formFile" >
									<a><img src="/icon/add.png" style={{ width: "200px" }} /></a>
								</label>
							)}

						<input name="thumbnail" type="file" id="formFile" multiple hidden onChange={(e) => {
							console.log(e.target.files)
							setThumbnail((prev) => {
								return [...e.target.files]
							})
						}} />
					</Box>
					<TextField label="تعداد :" variant="outlined"
						name="amount"
						id="amount"
						value={product.amount}
						onChange={(e) => {
							onProductChange(e);
						}} />

					<TextField label="قیمت :" variant="outlined"
						name="price"
						value={product.price.low}
						onChange={(e) => {
							onProductChange(e);
						}} />

					<TextField label="تخفیف :" variant="outlined"
						name="discount"
						value={product.discount}
						onChange={(e) => {
							onProductChange(e);
						}} />

					<Box textAlign={'center'}>
						{product.discount != 0 ? (
							<div>
								<Typography variant='h4' >
									{setPoint(
										product.price.low - (product.price.low * product.discount) / 100
									)}
								</Typography>
								<Typography variant='h4' className={`  priceWithDiscount`}>
									{setPoint(product.price.low)}
								</Typography>
							</div>
						) : (
							<h3  >{setPoint(product.price.low)}</h3>
						)}
					</Box>
				</Stack>

				<Stack gap={2} width={{ md: "40%", lg: "100%" }}>
					<TextField label="نام :" variant="outlined"
						name="name"
						value={product.name}
						onChange={(e) => {
							onProductChange(e);
						}} />


					<FormControl fullWidth >
						<InputLabel id="brandInp">برند</InputLabel>
						<Select
							name='brand'
							onChange={(e) => {
								onProductChange(e)
							}}
							value={product.brand}
							labelId="brandInp"
							id="brand"
							label="برند"
						>
							{getAllBrands
								? getAllBrands.map((brand, index) => (
									<MenuItem key={index} value={brand.title}>{brand.title}</MenuItem>
								))
								: null}
						</Select>

					</FormControl>

					<FormControl fullWidth >
						<InputLabel id="CategoryInp">دسته ها</InputLabel>
						<Select

							onChange={(e) => addCategory(e)}
							labelId="CategoryInp"
							id="category"
							label="دسته ها"
						>
							{getAllCategories
								? getAllCategories.map((brand, index) => (
									<MenuItem key={index} value={brand.title}>{brand.title}</MenuItem>
								))
								: null}
						</Select>
						<Stack direction={'row'} gap={1} mt={2} maxWidth={"100%"} flexWrap={'wrap'} >
							{getSelectedCategories.map((cate, index) => (
								<Chip key={index} label={cate} variant="outlined" onDelete={() => {
									removeCategory(cate)
								}} />
							))}
						</Stack>

					</FormControl>



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
				</Stack>
			</Stack>
			<Button type="submit" variant="contained" >تایید</Button>
		</form>
	)
}

export default ProductForm

