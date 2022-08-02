import Meta from "./Meta";
import Nav from "./Nav";

const HomeLayout =({children}) => {

    return(
        <>
        <Meta title="Home" />
        <Nav/>
        {children}
        </>
    )
}

export default HomeLayout;