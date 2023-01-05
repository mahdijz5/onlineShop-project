import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

import {Router} from "next/router"
import { useState } from "react";
import Loader from "../components/Loader";

function MyApp({ Component, pageProps }) {
	const [loading,setLoading] = useState(false)
	
	
	const getLayout = Component.getLayout || ((page) => page); 
	return (
		<>
			{loading ? <Loader/> : getLayout(<Component {...pageProps} />)}
			
		</>
	)
}

export default MyApp;
