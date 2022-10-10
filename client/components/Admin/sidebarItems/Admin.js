import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import {  ExpandLess, ExpandMore, Inbox, People, PersonAdd } from "@mui/icons-material";
import { useState } from "react";

function Admin() {
	const [open, setOpen] = useState(false)
	return (
		<div>
			<List>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemText >
						<Typography variant="h5" color={'primary'} px={'25px'} fontWeight="bold">ادمین ها</Typography>
					</ListItemText>
					{open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<PersonAdd />
								</ListItemIcon>
								<ListItemText primary="اضافه کردن ادمین" />
							</ListItemButton>
						</NavLink>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
						<ListItemButton>
							<ListItemIcon>
								<People />
							</ListItemIcon>
							<ListItemText primary="لیست ادمین ها" />
						</ListItemButton>
					</NavLink>
					</List>
				</Collapse>
				</List>
		</div>
	)
}

export default Admin