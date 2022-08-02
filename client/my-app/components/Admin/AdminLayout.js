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
					router.push("/404");
				}
			} catch (error) {
				router.push("/404");
			}
		};
        
		auth();
        
        
	}, []);


    return(
        <AdminDashboardContext.Provider value={{
            styles,
        }}>
            <Meta title="داشبورد ادمین" />
        <AdminNav/>
        <div className="row" style={{}}>
            <div className={`${styles.sidebar} col-2`} style={{
                overflowY : "auto",
                position : "fixed",
                height : "91vh",
                backgroundColor : "#FFFFFF",
                boxShadow:
                "0 0.46875rem 2.1875rem rgb(4 9 20 / 3%), 0 0.9375rem 1.40625rem rgb(4 9 20 / 3%), 0 0.25rem 0.53125rem rgb(4 9 20 / 5%), 0 0.125rem 0.1875rem rgb(4 9 20 / 3%)",
            }}>
            <AdminSidebar />
            </div>
            <div className="col-sm-10"  style={{
                position:"fixed",
                height : "91vh",
                marginRight : "18%"
            }}>
                {children} 
                <AdminFooter/>
            </div>
            
        </div>
        </AdminDashboardContext.Provider>
    )
}

export default AdminLayout;