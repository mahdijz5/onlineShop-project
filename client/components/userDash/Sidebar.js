import Link from "next/link";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGear
} from "@fortawesome/free-solid-svg-icons";

import { dashboardContext } from "../../context/context";
import NavLink from "../NavLink";

const UserSidebar = () => {
    const {styles} = useContext(dashboardContext)

    return(
        <>
            <NavLink href="/dashboard" activeClassName={styles.activeSidebarItems +" "+ styles.underLineFromRight} ><a className={`${styles.sidebarItem} d-block hvr-underline-from-right`}> تنظیمات <FontAwesomeIcon icon={faGear}/></a></NavLink>

            <NavLink href="" activeClassName={styles.activeSidebarItems +" "+ styles.underLineFromRight} ><a className={`${styles.sidebarItem} d-block hvr-underline-from-right`}>hello</a></NavLink>
            
        </>
    )
}

export default UserSidebar;