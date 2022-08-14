import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import {Router} from "next/router"
import { useState } from "react";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
	const [loading,setLoading] = useState(false)
	
	Router.events.on("routeChangeStart", (url) => {
		NProgress.start();
		setLoading(true)
	})
	Router.events.on("routeChangeComplete", (url) => {
		NProgress.done();
		setLoading(false)
	})

	const getLayout = Component.getLayout || ((page) => page); 
	return (
		<>
			{loading ? <Loader/> : getLayout(<Component {...pageProps} />)}
			
		</>
	)
}

export default MyApp;
