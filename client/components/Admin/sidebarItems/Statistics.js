import styles from "../../../styles/Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCreditCard,
	faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "../../NavLink";

function Statistics() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}> امار ها </h4>
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faShoppingCart} className={`${styles.sidebarIcons} px-2`} />
							فروش ها
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
							<FontAwesomeIcon icon={faCreditCard} className={`${styles.sidebarIcons} px-2`} />
							تجارت
						</a>
					</NavLink>
				</div>
  )
}

export default Statistics