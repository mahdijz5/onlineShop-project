import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useTransition } from "react";

import Meta from "../../../components/Meta";
import UserLayout from "../../../layouts/UserLayout";
import MainLayout from "../../../layouts/MainLayout";
import { login } from "../../../services/auth";
import {  Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography } from "@mui/material";
import Loader from "../../../components/Loader";
import { toastNotif } from "../../../helpers/tools";
import { mergeCart } from "../../../services/user";

const signIn = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition()
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
		rememberMe: "",
	})


	const onSubmit = (event) => {
		event.preventDefault()
		startTransition(async () => {
			try {

				login(formValues,async(response,err) => {
					console.log(response,err)
					if(err) {
						toastNotif(err?.response?.data.message, err?.response?.data.status,0)

					}else {
						localStorage.setItem("accessToken", response.data.accessToken)
						localStorage.setItem("refreshToken", response.data.refreshToken)
						toastNotif(response.data.message, response.status, 0);
						router.push("/dashboard")
						await mergeCart(formValues.email)
					}
				})
			} catch (error) {
				console.log(error)
			}
		})
	}

	return (
		<div>
			<Meta title="احزار هویت" />
			{isPending ? <Loader/> : (
				<form
					onSubmit={(event) => {
						onSubmit(event)
					}}
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
					<Stack gap={"15px"} justifyContent="center">
						<h1 className="mb-2">ورود</h1>
						<TextField
							label="ایمیل"
							name="email"
							value={formValues.email}
							onChange={(event) => {
								setFormValues({
									...formValues,
									[event.target.name]: event.target.value
								})
							}}
						/>
						<TextField
							type="password"
							label="رمز عبور"
							name="password"
							value={formValues.password}
							onChange={(event) => {
								setFormValues({
									...formValues,
									[event.target.name]: event.target.value
								})
							}}
						/>

						<FormGroup>
							<FormControlLabel control={
								<Checkbox
									name="rememberMe"
									value="remember-me"
									onChange={(event) => {
										setFormValues({
											...formValues,
											[event.target.name]: !formValues.rememberMe
										})
									}} />
							} label="مرا بخاطر بسپار" />
						</FormGroup>

						<Button type="submit" variant="contained">
							تایید
						</Button>
						<Link href="/user/sign-up">
							<a>
								<Typography color='text.primary'>
									حساب کاربری ایی ندارم
								</Typography>
							</a>
						</Link>
					</Stack>
				</form>
			)}
			<ToastContainer />
		</div>
	);
};

signIn.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<UserLayout>{page}</UserLayout>
		</MainLayout>
	)
}

export default signIn;
