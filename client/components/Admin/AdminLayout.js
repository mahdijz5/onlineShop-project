import dynamic from "next/dynamic";
import styles from "../../styles/Admin.module.css"
const AdminNav = dynamic(() => import('./Nav'), {
	suspense: true,
})
const AdminFooter = dynamic(() => import('./Footer'), {
	suspense: true,
})
const AdminSidebar = dynamic(() => import('./Sidebar'), {
	suspense: true,
})

import { AdminDashboardContext } from "../../context/context";
import Meta from "../Meta";
// import {adminAuthenticated,refreshToken } from "../../services/auth";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, Router } from "next/router";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader";
import { Box, Container, NoSsr, Skeleton, Stack } from "@mui/material";

const AdminLayout = ({ children }) => {
	const router = useRouter()

	const [getSelectedCategories, setSelectedCategories] = useState([]);
	const [loading, setLoading] = useState(false)
	const sidebarRef = useRef(null)

	// authintication>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	// useEffect(() => {
	// 	const auth = async () => {
	// 		try {
	// 			const { data, status } = await adminAuthenticated();
	// 			if (status == 200) {
	// 				setTimeout(() => {
	// 					refreshToken();
	// 				},1000 * 200)
	// 				return;
	// 			} else if (status == 401) {
	// 				// router.push("/404");
	// 			}
	// 		} catch (error) {
	// 			// router.push("/404");
	// 		}
	// 	};     
	// 	auth();
	// }, []);

	//loading spinner>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	Router.events.on("routeChangeStart", (url) => {
		NProgress.start();
		setLoading(true)
	})
	Router.events.on("routeChangeComplete", (url) => {
		NProgress.done();
		setLoading(false)
	})

	return (


		<AdminDashboardContext.Provider value={{
			styles,
			getSelectedCategories,
			setSelectedCategories,
		}}>
			<Meta title="داشبورد ادمین" />
			<Suspense fallback={<Skeleton animation="wave" variant="rectangular" width={"100%"} height={70} />}>
				<AdminNav sidebarRef={sidebarRef} />
			</Suspense>

			<Stack direction={'row'} p={0}>
				<Box width={"400px"} display={{ xs: "none", lg: "block" }} ref={sidebarRef}>
					<Suspense fallback={<Skeleton animation="pulse" variant="rectangular" width={"300px"} height={"100vh"} />}  >
						<AdminSidebar />
					</Suspense>
				</Box>


				 
					<Container width={"100%"}  >
						{loading ? <Loader /> : children}
					</Container>
				 
			</Stack>
			<Suspense fallback={`Loading...`}>
				<AdminFooter />
			</Suspense>


			<ToastContainer />

		</AdminDashboardContext.Provider>

	)
}

export default AdminLayout;