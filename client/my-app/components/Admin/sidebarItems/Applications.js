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

function Applications() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}> برنامه ها </h4>
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem} d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faMessage} className={`${styles.sidebarIcons} px-2`} />
							پیام رسان
						</a>
					</NavLink>
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem} d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faTasks} className={`${styles.sidebarIcons} px-2`} />
							لیست وظایف
						</a>
					</NavLink>
				</div>
  )
}

export default Applications