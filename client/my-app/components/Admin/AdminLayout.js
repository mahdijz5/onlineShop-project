import AdminNav from "./Nav";
import AdminFooter from "./Footer";
import AdminSidebar from "./Sidebar";
import styles from "../../styles/Admin.module.css"

import { Primary } from "../../helpers/color";
import  {AdminDashboardContext} from "../../context/context";
import Meta from "../Meta";
import {adminAuthenticated,refreshToken } from "../../services/auth";
import { useEffect } from "react";
import {  useRouter } from "next/router";
import { toast , ToastContainer } from "react-toastify";

const AdminLayout =({children}) => {
    const router = useRouter()

   

	useEffect(() => {
		const auth = async () => {
			try {
				const { data, status } = await adminAuthenticated();
				if (status == 200) {
                    setTimeout(() => {
                        refreshToken();
                    },1000 * 200)
					return;
				} else if (status == 401) {
					// router.push("/404");
				}
			} catch (error) {
				// router.push("/404");
			}
		};
        
		auth();
        
        
	}, []);


	const toastNotif = (msg, status,delay) => {
		setTimeout(() => {
			if (status >= 200 && status < 300) {
				toast.success(msg, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				toast.error(msg, {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		}, delay);
	};

	const setPoint = (number) => {
		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
	}


    return(
        <AdminDashboardContext.Provider value={{
            styles,
            toastNotif,
			setPoint,
        }}>
            <Meta title="داشبورد ادمین" />
        <AdminNav/>
        <div className="row" style={{}}>
            <div className={`${styles.sidebar} col-2`}>
            <AdminSidebar />
            </div>
            <div className={`${styles.container} col-sm-10`}>
                {children} 
                <AdminFooter/>
            </div>
            
        </div>
        <ToastContainer/>
        </AdminDashboardContext.Provider>
    )
}

export default AdminLayout;