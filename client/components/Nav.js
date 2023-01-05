import { getAllCategories, getAllBrands } from "../services/product"

import { AppBar, Avatar, Badge, Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import * as React from 'react';
import { ContentCopy, Favorite, Logout, Person, Search, ShoppingBag, ShoppingCart } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu"
import styled from "@emotion/styled";
import { cloneElement, useContext, useEffect, useState } from "react";
import Link from "next/link";
import SearchPanel from "./Search/SearchPanel";
import { useRouter } from "next/router";
import { General } from "../context/context";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
	alignItems: 'stretch',
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
	transition: "0.2s",
	display: "flex",
	alignItems: "center",
	cursor: "pointer",

}))

const LeftOptionBox = styled(Box)(({ theme }) => ({
	":hover": {
		backgroundColor: theme.palette.primary.dark
	},
	borderLeft: `1px solid ${theme.palette.primary.light}`,
	padding: "19px",
	height: "100%",
	transition: "0.2s",
	display: "flex",
	alignItems: "center",
	cursor: "pointer",

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
	const { user,setRefresh,myCart } = useContext(General)
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [openSearch, setOpenSearch] = useState(false)
	const [categories, setCategories] = useState([])
	const [brands, setBrands] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const { data: allBrands } = await getAllBrands()
			const { data: allCategories } = await getAllCategories()
			setCategories(allCategories.categories)
			setBrands(allBrands.brands)
		}
		
		fetchData()
	}, [])
	

	return (
		<>
			<Box visibility={'hidden'} mb={"57px"}></Box>
			<ElevationScroll >

				<AppBar position="fixed" sx={{ marginBottom: "500px" }}>
					<StyledToolbar>
						<Stack direction={"row"} height="64px" >
							<Box display={{ sm: "inline-block", xs: "none" }}>

								<Link href="/dashboard/cart">
									<a>
										<RightOptionBox >
										<Badge badgeContent={  myCart.length > 0 ?
										myCart.length : null} color={'error'}>
											<ShoppingCart />
										</Badge>
										</RightOptionBox>
									</a>
								</Link>
							</Box>
							<Box display={{ sm: "inline-block", xs: "none" }}>
								<Link href="/dashboard/list">
									<a>
										<RightOptionBox>
											<Favorite />
										</RightOptionBox>
									</a>
								</Link>
							</Box>

							{user.name != undefined ? (
								<RightOptionBox>

									<Avatar src={`http://localhost:3001/uploads/profiles/${user.profileImg}`} onClick={(e) => { handleClick(e) }} alt={user.name} color="secondary" />
								</RightOptionBox>
							) : (
								<Link href="/user/sign-in">
									<a>

										<RightOptionBox onClick={() => {

										}} >
											<Person />
										</RightOptionBox>
									</a>
								</Link>
							)}
						</Stack>

						<Stack direction={"row"} width={'40%'} height="64px" alignItems={"center"} justifyContent="center">
							<Link href="/"><a><Typography variant="h6" > MahdiJz </Typography></a></Link>
						</Stack>

						<Stack direction={"row"} height="64px" >

							<LeftOptionBox onClick={() => {
								setOpenSearch(true)
							}} >
								<Search />
							</LeftOptionBox>

						</Stack>
					</StyledToolbar>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem onClick={() => {
							handleClose()
							router.push('/dashboard/user-data')
						}}>
							<ListItemIcon>
								<Person fontSize="small" />
							</ListItemIcon>
							<ListItemText>پروفایل</ListItemText>
						</MenuItem>
						<MenuItem onClick={() => {
							handleClose()
							router.push('/dashboard/cart')
						}}>
							<ListItemIcon>
								<ShoppingCart fontSize="small" />
							</ListItemIcon>
							<ListItemText>سبد خرید</ListItemText>
						</MenuItem>
						<MenuItem onClick={() => {
							handleClose()
							router.push('/dashboard/user-data')
						}}>
							<ListItemIcon>
								<ShoppingBag fontSize="small" />
							</ListItemIcon>
							<ListItemText>سفارش ها</ListItemText>
						</MenuItem>
						<Divider/>
						<MenuItem onClick={() => {
							handleClose()
							localStorage.clear()
							setRefresh(p=> !p);
							router.replace('/')
						}}>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							<ListItemText>خروج</ListItemText>
						</MenuItem>
					</Menu>
				</AppBar>
			</ElevationScroll>
			<SearchPanel open={openSearch} setOpen={setOpenSearch} brands={brands} categories={categories} pathBase={`/search`} />
		</>
	);
};

export default Nav;
