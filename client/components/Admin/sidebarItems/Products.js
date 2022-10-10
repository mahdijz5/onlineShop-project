import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";
import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { AddCircle, ExpandLess, ExpandMore, ShoppingBasket, ShoppingCart } from "@mui/icons-material";

function Products() {
	const [open, setOpen] = useState(false)
	return (
		<div>
			<List>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemText >
						<Typography variant="h5" color={'primary'} px={'25px'} fontWeight="bold">محصولات ها</Typography>
					</ListItemText>
					{open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<NavLink href="/admin/dashboard/view-products" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<ShoppingCart />
								</ListItemIcon>
								<ListItemText primary="نمایش محصولات" />
							</ListItemButton>
						</NavLink>
						<NavLink href="/admin/dashboard/add-category" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<AddCircle />

								</ListItemIcon>
								<ListItemText primary="اضافه کردن دسته جدید" />
							</ListItemButton>
						</NavLink>
						<NavLink href="/admin/dashboard/view-brand" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<AddCircle />

								</ListItemIcon>
								<ListItemText primary="اضافه کردن برند جدید" />
							</ListItemButton>
						</NavLink>
					</List>
				</Collapse>
			</List>
			


		</div>
	)
}

export default Products