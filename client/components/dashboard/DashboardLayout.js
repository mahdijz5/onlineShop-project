import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { userAuthenticated } from "../../services/auth";
import { Box, Button, Container, Grid, Stack } from "@mui/material";
import Nav from "../Nav";
import Header from "../Header";
import styled from "@emotion/styled";
import DashboardList from "./DashboardList";
import { getUser } from "../../services/user";


const StyledGrid = styled(Box)(({theme}) => ({
	borderRadius : theme.shape.borderRadius,
	height: "60vh"
}))

const {dashboardContext} = require('../../context/context')

const DashboardLayout = ({ children }) => {
	const router = useRouter();
	const [user,setUser] = useState({})

	useEffect(() => {
		userAuthenticated((data) => {
			console.log(data)
			if(data.status == 401 || data.status == 403){
				router.replace('/user/sign-in')
				console.log("logout")
			}
		}) 
		
		getUser(({data}) => {
			setUser(data.user)
		})
		
	}, []);
	
	const fetch = async() => {
		
	}
	
	return (
		<dashboardContext.Provider value={{
			user,
		}}>
			<Stack>
				<Nav/>
 
				<Container >
					<Grid container mt='40px' spacing={2}>
						<Grid Item md={3} xs={12} p="20px" pl={{md : "0"}} >
							<StyledGrid>
								<DashboardList/>
							</StyledGrid>
						</Grid>
						<Grid Item md={9} xs={12} p="20px" pr={{md : "0"}}>
							<StyledGrid>
								{children}		
							</StyledGrid>
						</Grid>
					</Grid>
				</Container>
			</Stack>
		</dashboardContext.Provider>
	);
};

export default DashboardLayout;
