import { Formik, Field, ErrorMessage, Form } from "formik";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Meta from "../../../components/Meta";
import { userSchema } from "../../../validation/userRegister";
import { useRouter } from "next/router";
import UserLayout from "../../../layouts/UserLayout";
import MainLayout from "../../../layouts/MainLayout";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import TextFieldWrapper from "../../../components/ui/TextFieldWrapper";

const signUp = () => {
	const router = useRouter();

	const signUpNotif = (msg, status) => {
		if (status == 201) {
			toast.success(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			toast.error(msg, {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<>
			<Meta title="ثبت نام" />

			<Formik
				initialValues={{
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
				}} 
				validationSchema={userSchema}
				onSubmit={async (values) => {
					try {
						const response = await axios.post(
							process.env.SERVER_URI
								? `${process.env.SERVER_URI}/user/sign-up`
								: `http://localhost:3001/user/sign-up`,
							values
						);
						console.log(response);
						signUpNotif(response.data.message, response.status);
						if (response.status == 201) {
							router.push("/user/sign-in");
						}
					} catch (error) {
						console.log(error);
						signUpNotif(error.response.data.message, error.response.status);
					}
				}}
			>
				<Form
					method="post"
					className="input-group w-50 d-inline-block p-0"
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						overflow: "hidden",
					}}
				>
					<h1 className="mb-2">ثبت نام</h1>


					<Stack gap="15px" justifyContent="space-around">
							<TextFieldWrapper name="name" label="نام کاربری" variant="outlined" />
							<TextFieldWrapper label="ایمیل" name="email" variant="outlined" />
							<TextFieldWrapper type="password" label="رمز عبور" name="password" variant="outlined" />
							<TextFieldWrapper type="password" label="تکرار رمز عبور" name="confirmPassword" variant="outlined" />
					<Button
						type="submit"
						variant="contained"
					>
						تایید
					</Button>
					<Link href="/user/sign-in"><Typography color="text.primary" sx={{cursor : "pointer"}}>قبلا ثبت نام کردام</Typography></Link>
					</Stack>
				</Form>
			</Formik>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
};

signUp.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<UserLayout>{page}</UserLayout>
		</MainLayout>
	)
}


export default signUp;
