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

function Storage() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}>انبار</h4>
				 
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faX} className={`${styles.sidebarIcons} px-2`} />
							محصولات ناموجود
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
							<FontAwesomeIcon icon={faShoppingBag} className={`${styles.sidebarIcons} px-2`} />
							نمیاش تمام محصولات
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
							<FontAwesomeIcon icon={faTruck} className={`px-2 p-1 ${styles.sidebarIcons}` }/>
							تغییر وضعیت محصول ها
						</a>
					</NavLink>
				</div>
  )
}

export default Storage