import { useEffect,useContext } from "react";
import { useRouter } from "next/router";

import Nav from "./Nav";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Primary } from "../../helpers/color";
import { refreshToken, userAuthenticated } from "../../services/auth";
import  {dashboardContext} from "../../context/context";
import styles from "../../styles/Admin.module.css"

const UserLayout = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		const auth = async () => {
			try {
				const { data, status } = await userAuthenticated();
				if (status == 200) {
					setTimeout(() => {
                        refreshToken();
                    },1000 * 200)
					return;
				} else if (status == 401) {
					router.push("/user/sign-in");
				}
			} catch (error) {
				router.push("/user/sign-in");
			}
		};

		auth();  
	}, []);

	return (
		<dashboardContext.Provider value={{
			styles,
		}}>
			<Nav />
			<div className="row" style={{}}>
				<div
					className={`${styles.sidebar} col-2`}
					style={{
						overflowY: "auto",
						height: "100vh",
						maxHeight: "100vh",
						backgroundColor: "#FFFFFF",
					}}
				>
					<Sidebar />
				</div>
				<div
					className="col-sm-10"
					style={{
						height: "100vh",
						maxHeight: "100vh",
					}}
				>
					{children}
					<Footer />
				</div>
			</div>
		</dashboardContext.Provider>
	);
};

export default UserLayout;
