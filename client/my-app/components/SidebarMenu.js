import { useState } from "react";
import styles from "../styles/Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons";

const SidebarMenu = ({ children, title }) => {
	const [state, setState] = useState(false);

	return (
		<div>
			<div
				onClick={() => {
					setState((prev) => !prev);
				}}
				style={{
					cursor: "pointer",
				}}
			>
				<div className={`${styles.sidebarItem}`} >
					<strong >
					{title}{" "}
					</strong>
					<strong
						style={{
							float: "left",
						}}
						>	
					{state ? <FontAwesomeIcon icon={faChevronDown} /> : (<FontAwesomeIcon icon={faChevronUp} />)}
						
					</strong>
				</div>
			</div>
			<div
				style={
					state
						? { height: "auto", transition: "1s" }
						: { height: "0", display: "none", transition: "1s" }
				}
			>
				{children}
			</div>
		</div>
	);
};

export default SidebarMenu;
