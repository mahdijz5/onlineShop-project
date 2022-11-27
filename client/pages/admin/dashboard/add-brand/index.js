import ReactDOM  from "react-dom";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import AdminLayout from "../../../../layouts/AdminLayout";
import MainLayout from "../../../../layouts/MainLayout";
import {
	addBrand as addNewBrand,
	deleteBrand,
	editBrand as editBrandRequest ,
 
} from "../../../../services/adminDashboard";
import {getAllBrands} from "../../../../services/product"
import { AdminDashboardContext } from "../../../../context/context";
import {  toastNotif } from "../../../../helpers/tools";
import CategoryAndBrandTable from "../../../../components/Admin/CategoryAndBrandTable";
import { Button, Stack, TextField } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)({
	borderRadius: "unset",
	borderRadius: "0 5px 5px 0"
})

const addBrand = ({ brands }) => {
	const router = useRouter();
	const [brand, setBrand] = useState("");
	const [allBrands, setBrands] = useState([]);
	const [selectedItems, setSelectedItems] = useState([])

	useEffect(() => {
		setBrands(brands);
		
	}, []);

	const refreshData =async () => {
		try {
			const { data } = await getAllBrands();
			setBrands(data.brands)
			setSelectedItems([])
			setBrand('')
		} catch (error) {
			console.log(error)
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (brand == "") {
				toastNotif("لطفا نامی برای برند خود انتخاب کنید", 400);
				return;
			}
			const { data, status } = await addNewBrand(brand);
			toastNotif(data.message, status, 0);
			if (status == 201) {
				refreshData();
			}
		} catch (error) {
			toastNotif(error.response.data.message, error.response.status, 0);
		}
	};

	const handleDelete = async (id) => {
		try {
			const { status, data } = await deleteBrand(id);
			toastNotif(data.message, status, 0);
			if (status == 200) {
				refreshData();
			}
		} catch (error) {
			toastNotif(error.response.data.message, error.response.status, 0);
		}
	};

	const handleEdit = async(value) => {
		try {
			const {data,status} = await editBrandRequest(selectedItems[0],value)
			toastNotif(data.message, status, 0);
			refreshData()
		} catch (error) {
			console.log(error)
			toastNotif(error.response.data.message, error.response.status, 0);
		}
	}

	return (
		<>
			<CategoryAndBrandTable editFunc={handleEdit} items={allBrands} handleDelete={handleDelete} headerName={["نام"]} selectedItems={selectedItems} setSelectedItems={setSelectedItems} >
				<>
					<form onSubmit={(e) =>  e.preventDefault()}>
						<Stack direction={"row"}>
							<TextField label="نام دسته را وارد کنید" variant="outlined" value={brand} onChange={(e) => setBrand(e.target.value)} />
							<StyledButton type="submit" variant="contained" onClick={handleSubmit}>تایید</StyledButton>
						</Stack>
					</form>
				</>
			</CategoryAndBrandTable>
		</>
	);
};

export const getServerSideProps = async (context) => {
	const { data } = await getAllBrands();

	return {
		props: {
			brands: data.brands,
		},
	};
};

addBrand.getLayout = (page) => {
	return (
		<MainLayout>
			<AdminLayout>{page}</AdminLayout>
		</MainLayout>
	);
};

export default addBrand;

// <div className="row h-100 p-0 m-0">
// 				<div className="col-12">
// 					<form
// 						onSubmit={handleSubmit}
// 						method="post"
// 						className="input-group mt-5 me-2"
// 					>
// 						<input
// 							onChange={(event) => {
// 								setBrand(event.target.value);
// 							}}
// 							value={brand}
// 							name="title"
// 							placeholder="عنوانی برای برند خود انتخاب کنید"
// 							className="form-control form-control-warning"
// 							style={{
// 								borderRadius: "unset",
// 								borderRadius: "0px 5px 5px 0",
// 							}}
// 						/>
// 						<br />
// 						<button
// 							type="submit"
// 							className="btn btn-warning border-end"
// 							style={{
// 								borderRadius: "unset",
// 								borderRadius: "5px 0 0 5px",
// 							}}
// 						>
// 							تایید{" "}
// 						</button>
// 					</form>
// 				</div>
// 				<div
// 					className="col-12  mt-5 pb-5  text-light "
// 					style={{
// 						height: "90%",
// 						overflowY : "auto"
// 					}}
// 				>
// 					<table className="table table-striped table-hover " style={{
// 						overflowY : "auto"	
// 					}}>
// 						<thead>
// 							<tr>
// 								<th scope="col">#</th>
// 								<th scope="col">First</th>
// 							</tr>
// 						</thead>
// 						<tbody>
// 							{allBrands
// 								? allBrands.map((brand, index) => (
// 										<tr key={index}>
// 											<th scope="row">{index + 1}</th>
// 											<td>
// 												<Link
// 													href="/admin/dashboard/brand/[id]"
// 													as={`/admin/dashboard/brand/${brand._id}`}
// 												>
// 													<a>{brand.title}</a>
// 												</Link>
// 												<div
// 													style={{
// 														float: "left",
// 													}}
// 												>
// 													<button
// 														className="btn btn-danger mx-1 p-2"
										
// 														onClick={() => {
// 															// confirmation("ایا مطمعنی ؟","شما میخواهید این برند را حذف کنید ؟",handleDelete,allBrands[index]._id)
// 														}}
// 													>
// 														<FontAwesomeIcon icon={faTrash} />
// 													</button>
// 													<div id={`edit${index}`} className="d-none h-auto" >
// 														<input className="form-control d-inline-block" placeholder="عنوان جدیدی را بنویسید" value={editBrand} onChange={(e) => {
// 															setEditBrand(e.target.value)
// 														}} style={{
// 															width : "auto",
// 														}}/>
// 														<button type="submit" className="btn btn-success mx-1 p-2" onClick={() => {
// 															handleEdit(allBrands[index]._id)
// 														}}>
// 															تایید
// 														</button>
// 													</div>
// 													<button className="btn btn-warning mx-1 p-2" onClick={()=> {
// 														showEdit(index)
// 													}}>
// 														<FontAwesomeIcon icon={faPencil} />
// 													</button>
// 												</div>
// 											</td>
// 										</tr>
// 								  ))
// 								: null}
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>