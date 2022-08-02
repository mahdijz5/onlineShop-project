import { Formik, Field, ErrorMessage, Form } from "formik";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import Meta from "../../../components/Meta";
import styles from "../../../styles/User.module.css";
import { userSchema } from "../../../validation/userRegister";
import { useRouter } from "next/router";
import UserLayout from "../../../components/UserLayout";
import MainLayout from "../../../components/MainLayout";

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
		<div>
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
								if(response.status == 201) {
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
							<ErrorMessage
								name="name"
								render={(msg) => <div className="text-danger mb-1">{msg}</div>}
							/>
							<Field
								id="name"
								type="text"
								placeholder="نام خود را وارد کنید"
								name="name"
								className={styles.formInp + " form-control w-100 mb-3"}
							/>
							<ErrorMessage
								name="email"
								render={(msg) => <div className="text-danger mb-1">{msg}</div>}
							/>
							<Field
								id="email"
								placeholder="ایمیل خود را وارد کنید"
								name="email"
								className={styles.formInp + " form-control w-100 mb-3"}
							/>
							<ErrorMessage
								name="password"
								render={(msg) => <div className="text-danger mb-1">{msg}</div>}
							/>
							<Field
								type="password"
								id="password"
								placeholder="رمز عبوری برای خود انتخاب کنید"
								name="password"
								className={styles.formInp + " form-control w-100 mb-3"}
							/>
							<ErrorMessage
								name="confirmPassword"
								render={(msg) => <div className="text-danger mb-1">{msg}</div>}
							/>
							<Field
								type="password"
								id="confirmPassword"
								placeholder="تکرار رمز عبور را وارد کنید"
								name="confirmPassword"
								className={styles.formInp + " form-control w-100 mb-3"}
							/>
							<button
								type="submit"
								className="button2 hvr-bounce-to-top bouncy"
							>
								تایید
							</button>
							<br />
							<Link href="/user/sign-in">قبلا ثبت نام کردام.</Link>
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
		</div>
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
