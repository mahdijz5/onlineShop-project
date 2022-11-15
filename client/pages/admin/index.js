import MainLayout from "../../components/Layouts/MainLayout";
import AdminLayout from "../../components/Admin/AdminLayout";

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
