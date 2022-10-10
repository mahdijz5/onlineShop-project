
import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";
import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ExpandLess, ExpandMore, PointOfSale, Store } from "@mui/icons-material";

function Statistics() {
	const [open,setOpen] = useState(false)
	return (
		<div>
				<List>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemText >
						<Typography variant="h5" color={'primary'} px={'25px'} fontWeight="bold">آمار ها</Typography>
					</ListItemText>
					{open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<PointOfSale/>
								</ListItemIcon>
								<ListItemText primary="فروش" />
							</ListItemButton>
						</NavLink>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
						<ListItemButton>
							<ListItemIcon>
								<Store />
							</ListItemIcon>
							<ListItemText primary=" تجارت" />
						</ListItemButton>
					</NavLink>
					</List>
				</Collapse>
				</List>
		</div>
	)
}

export default Statistics