import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import MainLayout from "../components/MainLayout";

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page); 
	return getLayout(<Component {...pageProps} />)
	// return (
	// 	<>
	// 		{/* <MainLayout>
	// 			<Component {...pageProps} />
	// 		</MainLayout> */}
	// 		return (
	// 			getLayout(<Component {...pageProps} />)
	// 		)
	// 	</>
	// );
}

export default MyApp;
