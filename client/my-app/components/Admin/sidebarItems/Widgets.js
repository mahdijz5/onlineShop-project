import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faX,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "../../NavLink";
import styles from "../../../styles/Admin.module.css";

function Widgets() {
  return (
    <div>
					<h4 className={`${styles.sidebarHeaders}`}>ویجت ها</h4>
					<NavLink
						href=""
						activeClassName={
							styles.activeSidebarItems + " " + styles.underLineFromRight
						}
					>
						<a
							className={`${styles.sidebarItem}  d-block hvr-underline-from-right`}
						>
							ویجت 1
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
							ویجت 2
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
							ویجت 3
						</a>
					</NavLink>
				</div>
  )
}

export default Widgets