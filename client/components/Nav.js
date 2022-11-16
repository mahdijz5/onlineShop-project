import {getAllCategories,getAllBrands} from "../services/product"  

import { AppBar, Box, Stack, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { Favorite, Menu,Person,Search, ShoppingCart } from "@mui/icons-material";
import styled from "@emotion/styled";
import { cloneElement, useEffect, useState } from "react";
import Link from "next/link";
import SearchPanel from "./Search/SearchPanel";
import { useRouter } from "next/router";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems : 'stretch',
	padding: "0 !important",
	borderBottom: `1px solid ${theme.palette.primary.light}`,
}))

const RightOptionBox = styled(Box)(({ theme }) => ({
	":hover": {
		backgroundColor: theme.palette.primary.dark
	},
	borderRight: `1px solid ${theme.palette.primary.light}`,
	padding: "19px",
	height: "100%",
	transition : "0.2s",
	display : "flex",
	alignItems : "center",

}))

const LeftOptionBox = styled(Box)(({ theme }) => ({
	":hover": {
		backgroundColor: theme.palette.primary.dark
	},
	borderLeft: `1px solid ${theme.palette.primary.light}`,
	padding: "19px",
	height: "100%",
	transition : "0.2s",
	display : "flex",
	alignItems : "center",

}))

function ElevationScroll(props) {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}



const Nav = () => {
	const router = useRouter()
	const [openSearch,setOpenSearch] = useState(false)
	const [categories,setCategories] = useState([])
	const [brands,setBrands] = useState([])

	useEffect(() => {
		const fetchData =async () => {
			const {data : allBrands} = await getAllBrands()  
			const {data : allCategories} = await getAllCategories()
			setCategories(allCategories.categories)  
			setBrands(allBrands.brands)  
		}	

		fetchData()
	},[])

	return (
		<>
			<Box visibility={'hidden'} mb={"57px"}></Box>
			<ElevationScroll >

				<AppBar position="fixed" sx={{ marginBottom: "500px" }}>
					<StyledToolbar>
						<Stack direction={"row"} height="64px" >
							<Link href="">
								<a>
									<RightOptionBox >
										<ShoppingCart />
									</RightOptionBox>
								</a>
							</Link>
							<Link href="">
								<a>
									<RightOptionBox>
										<Favorite />
									</RightOptionBox>
								</a>
							</Link>
							<Link href="/user/sign-in">
								<a>
									<RightOptionBox >
										<Person />
									</RightOptionBox>
								</a>
							</Link>
						</Stack>

						<Stack direction={"row"} width={'40%'}  height="64px" alignItems={"center"} justifyContent="center">
							<Link href="/"><Typography variant="h6" > MahdiJz </Typography></Link>
						</Stack>

						<Stack direction={"row"} height="64px" >
							<Link href="">
								<a>
									<LeftOptionBox>
										<Menu /> <Typography display="inline-block" > دسته ها</Typography>
									</LeftOptionBox>
								</a>
							</Link>

									<LeftOptionBox onClick={() => {
										setOpenSearch(true)
									}} >
										<Search />
									</LeftOptionBox>

						</Stack>
					</StyledToolbar>
				</AppBar>
			</ElevationScroll>
			<SearchPanel open={openSearch} setOpen={setOpenSearch} brands={brands} categories={categories} pathBase={`/search`}/>
		</>
	);
};

export default Nav;
