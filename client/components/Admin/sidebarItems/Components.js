
import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";
import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import {  Diamond, ExpandLess, ExpandMore } from "@mui/icons-material";

function Components() {
	const [open, setOpen] = useState(false)
	return (
		<div>
			<List>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemText >
						<Typography variant="h5" color={'primary'} px={'25px'} fontWeight="bold">کامپوننت ها</Typography>
					</ListItemText>
					{open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<Diamond />
								</ListItemIcon>
								<ListItemText primary="دکمه ها" />
							</ListItemButton>
						</NavLink>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<Diamond />

								</ListItemIcon>
								<ListItemText primary="دراپ داون" />
							</ListItemButton>
						</NavLink>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<Diamond />

								</ListItemIcon>
								<ListItemText primary="آیکون ها" />
							</ListItemButton>
						</NavLink>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<Diamond />

								</ListItemIcon>
								<ListItemText primary="کارد ها" />
							</ListItemButton>
						</NavLink>
					</List>
				</Collapse>
			</List>
		</div>
	)
}

export default Components