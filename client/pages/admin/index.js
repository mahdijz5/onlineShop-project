import MainLayout from "../../layouts/MainLayout";
import AdminLayout from "../../layouts/AdminLayout";

const userDashboard = () => {
	return (
		<>
		
            
            <h1>Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World</h1>
		</>
	);
};

userDashboard.getLayout = (page) => {
    return (
        <MainLayout>
            <AdminLayout>{page}</AdminLayout>
        </MainLayout>
    )
}

export default userDashboard;
