import AdminNav from "./Nav";
import AdminFooter from "./Footer";
import AdminSidebar from "./Sidebar";
import styles from "../../styles/Admin.module.css"

import { Primary } from "../../helpers/color";
import  {AdminDashboardContext} from "../../context/context";
import Meta from "../Meta";
import {adminAuthenticated,refreshToken } from "../../services/auth";
import { useEffect,useState } from "react";
import {  useRouter,Router } from "next/router";
import { ToastContainer } from "react-toastify";
import Loader from "../Loader";

const AdminLayout =({children}) => {
	const router = useRouter()

	const [getSelectedCategories, setSelectedCategories] = useState([]);
	const [loading,setLoading] = useState(false)

	// authintication>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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

	//loading spinner>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	Router.events.on("routeChangeStart", (url) => {
		NProgress.start();
		setLoading(true)
	})
	Router.events.on("routeChangeComplete", (url) => {
		NProgress.done();
		setLoading(false)
	})


	//search>>>>>>>>>>>>>>>>>>
	const addCategory = (e) => {
        setSelectedCategories((prev) => {
            return [...prev, e.target.value];
        });
        router.push(`${router.pathname}?search=${router.query.search}&category=${getSelectedCategories}${getSelectedCategories.length > 0 ? "," : ''}${e.target.value}`)
    };

    const removeCategory = (cate) => {
        setSelectedCategories((prev) => {
            const prevCategories = [...prev];
            const removed = _.remove(prevCategories, (c) => {
                return c == cate;
            });
            router.push(`${router.pathname}?search=${router.query.search}&category=${prevCategories}`)
            return prevCategories;
        });
    };

    const handleChangeSearch = (event) => {
        router.replace(`${router.pathname}?search=${event.target.value}&category=${getSelectedCategories}`)
    }



    return(
        <AdminDashboardContext.Provider value={{
            styles,
			getSelectedCategories,
			setSelectedCategories,
			removeCategory,
			addCategory,
			handleChangeSearch,
        }}>
            <Meta title="داشبورد ادمین" />
        <AdminNav/>
        <div className="row" style={{}}>
            <div className={`${styles.sidebar} col-2`}>
            <AdminSidebar />
            </div>
            <div className={`${styles.container} col-sm-10`} style={{overflowY: "auto"}}>
				{loading ? <Loader/> :  children }
                <AdminFooter/>
            </div>
            
        </div>
        <ToastContainer/>
        </AdminDashboardContext.Provider>
    )
}

export default AdminLayout;