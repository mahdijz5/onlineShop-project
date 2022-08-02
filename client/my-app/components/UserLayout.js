import UserSwiper from "./userSwiper";

import styles from "../styles/User.module.css";
const UserLayout = ({children}) => {
	return (
		<>
			<div className={`${styles.body} row `}>
				<div
					className="col-lg-5 text-center"
					style={{
						position: "relative",
						height: "100%",
						overflow: "hidden",
					}}
				>
                    {children}
                </div>
				<div
					className="col-7 d-none d-lg-block p-0"
					style={{
						overflow: "hidden !important",
					}}
				>
					<UserSwiper />
				</div>
			</div>
			
		</>
	);
};

export default UserLayout;