import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faShoppingCart,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

import { Primary, Foreground, Secondary } from "../../helpers/color";
import styles from "../../styles/User.module.css";
import { useRef } from "react";

const Nav = () => {
	return (
		<>
			<link href="/components/navSearch/style.scss" rel="stylesheet" />
			<nav
				className="navbar navbar-expand-lg navbar-light  "
				style={{
					boxShadow:
						"rgba(0, 0, 0, 0.24) 0px 3px 8px;",
					backgroundColor: Foreground,
					color: Primary,
				}}
			>
				<div className="container-fluid text-light">
					<Link href="#">
						<a className="navbar-brand text-light">
							<Image src="/icon/brand.png" height={50} width={50} />
						</a>
					</Link>
					<Link href="#">
						<a className="navbar-brand text-light">
							<Image src="/icon/profile.png" height={50} width={50} />
						</a>
					</Link>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className={" nav-item "}>
								 
							</li>
							<li
								className={
									styles.navItem + " nav-item hvr-underline-from-center"
								}
							>
								<Link href="#">
									<a className="nav-link">Link</a>
								</Link>
							</li>
							<li
								className={
									styles.navItem + " nav-item hvr-underline-from-center bouncy"
								}
							>
								<Link href="#">
									<a className=" text-light">
										<FontAwesomeIcon icon={faShoppingCart} />
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
