import { useEffect, useState } from "react";
import Statistics from "./sidebarItems/Statistics";
import Applications from "./sidebarItems/Applications";
import Components from "./sidebarItems/Components";
import Admin from "./sidebarItems/Admin";
import Storage from "./sidebarItems/Storage";
import Products from "./sidebarItems/Products";
import { Divider, Stack } from "@mui/material";

import styles from "../../styles/Admin.module.css"

const Sidebar = () => {
	const [access, setAccess] = useState({});

	useEffect(() => {
		setAccess({
			Statistics: "Statistics",
			Applications: "Applications",
			Components: "Components",
			AdminAccess: "AdminAccess",
			Storage: "Storage",
			Products: "Products"
		});
	}, []);

	return (
		<>
			<Stack direction={'column'}  sx={{overflowY : "auto",backgroundColor : "white" ,zIndex : "2" }} className={styles.sidebar} pb="60px" width="300px"  height="100%" position={'fixed'}>
			{access.Statistics == "Statistics" ? (
				<Statistics />
			) : null}
			<Divider />
			{access.Applications == "Applications" ? (
				<Applications />
			) : null}
			<Divider />

			{access.Components == "Components" ? (
				<Components />
			) : null}

			<Divider />
			{access.Products == "Products" ? (
				<Products />
			) : null}
			<Divider />

			{access.Storage == "Storage" ? (
				<Storage />
			) : null}
			<Divider />

			{access.AdminAccess == "AdminAccess" ? (
				<Admin />
			) : null}


			</Stack>
		</>
	);
};

export default Sidebar;
