import { useEffect, useState } from "react";

import AdminLayout from "../../../../layouts/AdminLayout";
import MainLayout from "../../../../layouts/MainLayout";
import {
	addCategory as addNewCategory,
	deleteCategory,
	editCategory as editCategoryRequest,
} from "../../../../services/adminDashboard";
import {
	getAllCategories
} from "../../../../services/product";
import { toastNotif } from "../../../../helpers/tools";
import CategoryAndBrandTable from "../../../../components/Admin/CategoryAndBrandTable";
import { Stack, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)({
	borderRadius: "unset",
	borderRadius: "0 5px 5px 0"
})


const addCategory = ({ categories }) => {
	const [category, setCategory] = useState("");
	const [allCategories, setCategories] = useState([]);
	const [selectedItems, setSelectedItems] = useState([])
	useEffect(() => {
		setCategories(categories);

	}, []);

	const refreshData = async () => {
		try {
			const { data } = await getAllCategories();
			setCategories(data.categories)
			setSelectedItems([])
			setCategory('')
		} catch (error) {
			console.log(error)
		}
	};

	const handleSubmit = async () => {
		try {
			if (category == "") {
				toastNotif("لطفا نامی برای دسته خود انتخاب کنید", 400, 0);
				return;
			}
			const { data, status } = await addNewCategory(category);
			toastNotif(data.message, status, 0);
			if (status == 201) {
				refreshData();
			}
		} catch (error) {
			toastNotif(error.response.data.message, error.response.status, 0)
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await deleteCategory(id)
			if (response.status == 200) {
				refreshData()
			}
			toastNotif(response.data.message, response.status, 0)
		} catch (error) {
			if (error.response.data.message) {
				toastNotif(error.response.data.message, error.response.status, 0);
			}
		}
	}

	const handleEdit = async (value) => {
		try {
			const { data, status } = await editCategoryRequest(selectedItems[0], value)
			toastNotif(data.message, status, 0);
			refreshData()
		} catch (error) {
			console.log(error)
			toastNotif(error.response.data.message, error.response.status, 0);
		}
	}

	return (
		<>
			<CategoryAndBrandTable editFunc={handleEdit} items={allCategories} handleDelete={handleDelete} headerName={["نام"]} selectedItems={selectedItems} setSelectedItems={setSelectedItems} >
				<>
					<form onSubmit={(e) =>  e.preventDefault()}>
						<Stack direction={"row"}>
							<TextField label="نام دسته را وارد کنید" variant="outlined" value={category} onChange={(e) => setCategory(e.target.value)} />
							<StyledButton type="submit" variant="contained" onClick={handleSubmit}>تایید</StyledButton>
						</Stack>
					</form>
				</>
			</CategoryAndBrandTable>
		</>
	);
};

export const getServerSideProps = async (context) => {
	const { data } = await getAllCategories();

	return {
		props: {
			categories: data.categories,
		},
	};
};

addCategory.getLayout = (page) => {
	return (
		<MainLayout>
			<AdminLayout>{page}</AdminLayout>
		</MainLayout>
	);
};

export default addCategory;
