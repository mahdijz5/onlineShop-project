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
import styles from "../../../styles/Admin.module.css";

function Admin() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}>ادمین ها</h4>
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faUserPlus} className={`px-2 ${styles.sidebarIcons} pe-0 `} />
							اضافه کردن ادمین
						</a>
					</NavLink>
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faUser} className={`${styles.sidebarIcons} px-2`} />
							لیست ادمین ها
						</a>
					</NavLink>
				</div>
  )
}

export default Admin