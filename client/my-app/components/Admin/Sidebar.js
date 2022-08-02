import {  useEffect, useState } from "react";

import Statistics from "./sidebarItems/Statistics";
import Applications from "./sidebarItems/Applications";
import Components from "./sidebarItems/Components";
import Admin from "./sidebarItems/Admin";
import Storage from "./sidebarItems/Storage";
import Widgets from "./sidebarItems/Widgets";
import Products from "./sidebarItems/products";

const Sidebar = () => {
	const [access, setAccess] = useState({});

	useEffect(() => {
		setAccess({
			Statistics: "Statistics",
			Applications: "Applications",
			Components: "Components",
			AdminAccess: "AdminAccess",
			Storage: "Storage",
			Widgets: "Widgets",
			Products : "Products"
		});
	}, []);

	return (
		<>
			{access.Statistics == "Statistics" ? (
				<Statistics/>
			) : null}

			{access.Applications == "Applications" ? (
				<Applications/>
			) : null}

			{access.Components == "Components" ? (
				<Components/>
			) : null}

			{access.Products == "Products" ? (
				<Products/>
			) : null}

			{access.Storage == "Storage" ? (
				<Storage/>
			) : null}

			{access.AdminAccess == "AdminAccess" ? (
				<Admin/>
			) : null}


			{access.Widgets == "Widgets" ? (
				<Widgets/>
			) : null}
		</>
	);
};

export default Sidebar;
