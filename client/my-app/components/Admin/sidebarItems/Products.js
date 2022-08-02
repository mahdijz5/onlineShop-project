import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartPlus,
	faCreditCard,
	faDiamond,
	faList,
	faMagic,
	faMessage,
	faPlusCircle,
	faPlusSquare,
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

function Products() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}> محصولات </h4>
				
                    <NavLink
						href="/admin/add/product"
						activeClassName={
							styles.activeSidebarItems + "" + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faCartPlus} className={`${styles.sidebarIcons} px-2`} />
							اضافه کردن محصول جدید
						</a>
					</NavLink>
						
                    <NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + "" + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faPlusCircle} className={`${styles.sidebarIcons} px-2`} />
								اضافه کردن دسته جدید
						</a>
					</NavLink>
						
					
				</div>
  )
}

export default Products