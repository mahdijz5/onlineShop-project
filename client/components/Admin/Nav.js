
import { AppBar, Avatar, Badge, Box, Button, IconButton, InputBase, Toolbar, Typography, useScrollTrigger } from "@mui/material";

import { Home, Logout, Menu, Notifications, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import { cloneElement, useState } from "react";

const StyledToolbar = styled(Toolbar)({
	display: "flex",
	justifyContent: "space-between"
})

const IconBox = styled(Box)({
	display: "flex",
	justifyContent: "space-between",
	gap: "10px",
})

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



const AdminNav = ({ sidebarRef }) => {
	const [showSidebar, setShowSidebar] = useState(false)

	const openSidebar = () => {
		const display = sidebarRef.current.style.display;
		sidebarRef.current.style.display = display == "block" ? "none" : "block"
	}

	return (
		<>
		<Box visibility={'hidden'} mb={"57px"}></Box>
			<ElevationScroll >

				<AppBar position="fixed" sx={{marginBottom : "500px"}}>
					<StyledToolbar>
						<Box display={'flex'} alignItems="center"  >
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2, display: { xs: "block", lg: 'none' } }}
								onClick={() => {
										openSidebar()
										setShowSidebar((p) => !p)
									}} 
							>
								{!showSidebar ? (
									<Menu/>
								) : (<Remove />)}

							</IconButton>
							{/* //TODO  */}
							<Avatar />
							<Typography variant={"h5"} mx={1} sx={{ display: { xs: "none", lg: "block" } }}>Mahdi</Typography>


						</Box>

						<Box width={'40%'} bgcolor="white" borderRadius={"10px"}>
							<InputBase sx={{ display: "block", padding: "0 10px" }} placeholder="چیزی بنویسید ...." />
						</Box>
						<IconBox>
							<IconButton
								color="inherit" >
								<Home />
							</IconButton>
							<IconButton color="inherit"  >
								<Badge badgeContent={3} color={'error'}>
									<Notifications />
								</Badge>
							</IconButton>
							<IconButton color="inherit" >
								<Logout />
							</IconButton>
						</IconBox>
					</StyledToolbar>
				</AppBar>
			</ElevationScroll>
		</>
	);
};

export default AdminNav;
