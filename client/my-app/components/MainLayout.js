import Head from "next/head";
import Meta from "./Meta";
import Nav from "./Nav";

const MainLayout =({children}) => {

    return(
        <>
        <Meta title="Home" />
        {children}
        </>
    )
}

export default MainLayout;