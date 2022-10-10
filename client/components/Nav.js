import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiChevronDown, FiShoppingCart, FiUser, FiSearch,FiX } from "react-icons/fi"

import { Primary, Foreground, Secondary } from "../helpers/color";
import styles from "../styles/nav.module.css";
import NavLink from "./NavLink"
import SimpleSearch from "./SimpleSearch";
import DropDown from "./ui/DropDown";

const Nav = () => {
	const searchPage = useRef(null)

	const openSearchPage = () => {
		searchPage.current.classList = styles.openSearchPage
	}

	return (
		<div className={styles.navContainer}>

			<nav className={`${styles.nav} m-0 `}>
				<div className="row w-100 m-0 p-3 pb-0 text-center">
					<div className="col-sm-3 mt-5 ">
						<div className={`${styles.myCart} d-inline-block`}>
							<Link href={''}>
								<h5>
									<FiShoppingCart className="ms-1" />
									سبد خرید
								</h5>
							</Link>
						</div>
						<div className="d-inline-block me-3" style={{ fontSize: "20px", cursor: "pointer" }}>
							<FiUser />
						</div>
					</div>
					<div className="col-sm-6 text-center">
						<h1 className={styles.header}>Brand</h1>
					</div>
					<div className="col-sm-3  mt-5" >
						<div className="d-inline-block ms-auto" style={{ cursor: "pointer" }} onClick={() => {
							openSearchPage()
						}} >
							<h1 className="mb-3"><FiSearch /></h1>
						</div>
					</div>
				</div>
				<div style={{ padding: "0 430px" }}>
					<hr />
				</div>
				<div className="text-center m-0 pe-5 pb-5 pt-3">
					<div>
						<NavLink href={"/"} activeClassName={styles.activeLink}>
							<a className={`${styles.navItem} `}>
								<h4 className="d-inline-block">خانه</h4>
							</a>
						</NavLink>
						<NavLink href={"/about"} activeClassName={styles.activeLink}>
							<a className={`${styles.navItem} `}>
								<h4 className="d-inline-block">درباره ما</h4>
							</a>
						</NavLink>
						<NavLink href={"/contact-us"} activeClassName={styles.activeLink}>
							<a className={`${styles.navItem} `}>
								<h4 className="d-inline-block">ارتباط با ما</h4>
							</a>
						</NavLink>
						<a className={`${styles.navItem} `}>
							
								<DropDown triggerText={`<h4 className="d-inline-block">دسته ها </h4>`} classForTrigger={styles.DropDown}/>

						</a>
					</div>
				</div>
			</nav>
			{/* //searchPage */}
			<div className="d-none" ref={searchPage} >
				<div className={` m-4 d-inline-block ${styles.closeSearchBtn}`} onClick={() => {
					searchPage.current.classList = styles.closeSearchPage
				}}>
					<FiX className=" " />
				</div>
				<SimpleSearch address="/search"/>
			</div>
		</div>
	);
};

export default Nav;

