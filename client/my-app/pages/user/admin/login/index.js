import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

import Meta from "../../../../components/Meta";
import User from "../../../../styles/User.module.css";
import { useState } from "react";
import UserLayout from "../../../../components/UserLayout";
import MainLayout from "../../../../components/MainLayout";
import { login } from "../../../../services/auth";

const signIn = () => {
	const router = useRouter();
	const [formValues,setFormValues] = useState({
		email : "",
		password : "",
		rememberMe : "",
	}) 


	const signInNotif = (msg, status) => {
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

	const onSubmit =async(event) => {
		event.preventDefault()
		try {
			const response = await login(formValues)	
			localStorage.setItem("token",response.data.token)						
			router.push("/dashboard/admin")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Meta title="احزار هویت به عنوان ادمین" />
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
							<h1 className="mb-2">ورود</h1>
							<input
								id="email"
								placeholder="ایمیل خود را وارد کنید"
								name="email"
								className={User.formInp + " form-control w-100 mb-3"}
								value={formValues.email}
								onChange={(event) => {
									setFormValues({
										...formValues,
										[event.target.name] : event.target.value
									})
								}}
							/>
							<input
								type="password"
								id="password"
								placeholder="رمز عبور خود را وارد کنید"
								name="password"
								className={User.formInp + " form-control w-100 mb-3"}
								value={formValues.password}
								onChange={(event) => {
								setFormValues({
									...formValues,
									[event.target.name] : event.target.value
								})}}
							/>
							<div className="form-check d-inline-block" style={{
								textAlign : "right",
							}}>
								<input
									className="form-check-input"
									type="checkbox"
									name="rememberMe"
									id="flexCheckIndeterminate"
									value="remember-me"
									onChange={(event) => {
									setFormValues({
									...formValues,
									[event.target.name] : !formValues.rememberMe
									})}}
								/>
								<label className="form-check-label" for="flexCheckIndeterminate">
									مرا به خاطر بسپار
								</label>
							</div>
							<br/>
							<button
								type="submit"
								className="button2 hvr-bounce-to-top bouncy"
							>
								تایید
							</button>
							<br />
							<Link href="/user/sign-up">حساب کاربری ایی ندارم.</Link>
						</form>
			<ToastContainer/>
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
