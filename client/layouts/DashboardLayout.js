import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { userAuthenticated } from "../services/auth";
import { Box, Container, Grid, Paper, Stack } from "@mui/material";
import Nav from "../components/Nav";
import styled from "@emotion/styled";
import DashboardList from "../components/dashboard/DashboardList";
import Loader from "../components/Loader"
import { ToastContainer } from "react-toastify";

const StyledGrid = styled(Box)(({theme}) => ({
	borderRadius : theme.shape.borderRadius,
	height: "60vh",
}))



const DashboardLayout = ({ children }) => {
	const router = useRouter();
	const [loading,setLoading] = useState(false)


	useEffect(() => {
		setLoading(true)
		userAuthenticated((data) => {
			if(data.status == 401 || data.status == 403){
				if(router.pathname != "/dashboard/cart" || router.pathname != "/dashboard") {
					router.replace("user/sign-in")
				}
			}else {
				setLoading(false)
			}
		}) 
		setLoading(false)
		
	}, []);
	
	
	return (
		<>
			{loading ? <Loader/> : (
				<Stack>
				<Nav/>
 
				<Container >
					<Grid container mt='40px' gap={{xs : "35px",md : "0px"}}>
						<Grid item md={3} xs={12} p="20px" pl={{md : "0"}} >
							<StyledGrid>
								<DashboardList/>
							</StyledGrid>
						</Grid>
						<Grid item md={9} xs={12} p="20px" pr={{md : "0"}}>
							<StyledGrid>
								<Paper elevation={3} sx={{padding :"10px"}}>
								{children}
								</Paper>		
							</StyledGrid>
						</Grid>
					</Grid>
				</Container>
			</Stack>

			)}
			<ToastContainer />
		</>
	);
};

export default DashboardLayout;
