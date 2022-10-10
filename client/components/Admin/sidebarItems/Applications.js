
import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";
import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ChatBubble, ExpandLess, ExpandMore, ListAlt } from "@mui/icons-material";

function Applications() {
	const [open,setOpen] = useState(false)
	return (
		<div>
				<List>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemText >
						<Typography variant="h5" color={'primary'} px={'25px'} fontWeight="bold">برنامه ها</Typography>
					</ListItemText>
					{open ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
							<ListItemButton>
								<ListItemIcon>
									<ListAlt/>
								</ListItemIcon>
								<ListItemText primary="کار های روزمره" />
							</ListItemButton>
						</NavLink>
						<NavLink href="" activeClassName={styles.activeSidebarItems}>
						<ListItemButton>
							<ListItemIcon>
								<ChatBubble />
							</ListItemIcon>
							<ListItemText primary="پیامرسان" />
						</ListItemButton> 
					</NavLink>
					</List>
				</Collapse>
				</List>
		</div>
	)
}

export default Applications