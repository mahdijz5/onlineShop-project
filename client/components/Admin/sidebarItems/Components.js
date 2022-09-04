import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartPlus,
	faCreditCard,
	faDiamond,
	faList,
	faMagic,
	faMessage,
	faShoppingBag,
	faShoppingCart,
	faSquare,
	faTasks,
	faTruck,
	faUser,
	faUserPlus,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "../../NavLink";
import SidebarMenu from "../../SidebarMenu"; 
import styles from "../../../styles/Admin.module.css";

function components() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}> کامپوننت ها </h4>
					<SidebarMenu title="عناصر">
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								<FontAwesomeIcon icon={faDiamond} className={`${styles.sidebarIcons} px-2`} />
								دکمه ها
							</a>
						</NavLink>
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								<FontAwesomeIcon icon={faList} className={`${styles.sidebarIcons} px-2`} />
								دراپ داون
							</a>
						</NavLink>
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								<FontAwesomeIcon icon={faMagic} className={`${styles.sidebarIcons} px-2`} />
								آیکون ها
							</a>
						</NavLink>
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								<FontAwesomeIcon icon={faSquare} className={`${styles.sidebarIcons} px-2`} />
								کارد ها
							</a>
						</NavLink>
					</SidebarMenu>
					<SidebarMenu title="صفحه ها">
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								sign in
							</a>
						</NavLink>
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								sign up
							</a>
						</NavLink>
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								forget password
							</a>
						</NavLink>
						<NavLink
							href=""
							activeClassName={
								styles.activeSidebarItems + " " + styles.underLineFromRight
							}
						>
							<a
								className={`${styles.sidebarItem} ${styles.sidebarMenuItem} d-block hvr-underline-from-right`}
							>
								contact us
							</a>
						</NavLink>
					</SidebarMenu>
				</div>
  )
}

export default components