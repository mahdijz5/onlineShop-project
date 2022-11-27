import UserSwiper from "../components/Swipers/UserSwiper";

import Link from "next/link";
import { Home } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { Router } from "next/router";
import { useState } from "react";
import styled from "@emotion/styled";
import Loader from "../components/Loader";

const StyledStack = styled(Stack)(({theme}) => ({
	boxShadow:  theme.shadows[6],
	position: "fixed",
	top: "50px",
	bottom: "50px",
	right: "100px",
    left: "100px",
}))

const UserLayout = ({ children }) => {
	const [loading,setLoading] = useState(false)

	Router.events.on("routeChangeStart", (url) => {
		setLoading(true)
	})

	Router.events.on("routeChangeComplete", (url) => {
		setLoading(false)
	})

	return (
		<>
			<Link href="/">
				<a>
					<IconButton sx={{ color: "white", ":hover": { color: "text.primary" }, backgroundColor: "primary.main", margin: "7px" }}>
						<Home />
					</IconButton>
				</a>
			</Link>
			<StyledStack  direction="row">
				<Box
					width="55%"
					textAlign="center"
					position="relative"
					height="100%"
				>
					{loading ? <Loader/> : (
						<>
						{children}
						</>
					)}
				</Box>
				<Box
					width="45%"

					overflow={"hidden"}
					padding="0"
					display={"block"}
				>
					<UserSwiper />
				</Box>
			</StyledStack>

		</>
	);
};

export default UserLayout;
