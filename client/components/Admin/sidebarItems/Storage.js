import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";
import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import {  ExpandLess, ExpandMore, ShoppingBasket, ShoppingCart, Warehouse } from "@mui/icons-material";

function Products() {
	const [open, setOpen] = useState(false)
	return (
		<div>
			<List>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemText >
						<Typography variant="h5" color={'primary'} px={'25px'} fontWeight="bold">انبار</Typography>
					</ListItemText>
					{open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<NavLink href="/admin/dashboard/storage/check-products" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<Warehouse />
								</ListItemIcon>
								<ListItemText primary="نمایش محصولات" />
							</ListItemButton>
						</NavLink>
					</List>
				</Collapse>
			</List>
			


		</div>
	)
}

export default Products



						// 