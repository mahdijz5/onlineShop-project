import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartPlus,
	faPlusCircle,
	faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";

function Products() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}> محصولات </h4>
				
                    <NavLink
						href="/admin/dashboard/view-products"
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faShoppingBag} className={`${styles.sidebarIcons} px-2`} />
							نمایش محصولات
						</a>
					</NavLink>
						
                    <NavLink
						href="/admin/dashboard/add-product"
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
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
						href="/admin/dashboard/add-category"
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faPlusCircle} className={`${styles.sidebarIcons} px-2`} />
								اضافه کردن دسته جدید
						</a>
					</NavLink>

                    <NavLink
						href="/admin/dashboard/add-brand"
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							<FontAwesomeIcon icon={faPlusCircle} className={`${styles.sidebarIcons} px-2`} />
								اضافه کردن برند جدید
						</a>
					</NavLink>
						
					
				</div>
  )
}

export default Products