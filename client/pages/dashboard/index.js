import MainLayout from "../../components/Layouts/MainLayout";
import Meta from "../../components/Meta";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

const userDashboard = () => {
	return (
		<>
			<Meta title="داشبورد ادمین" />
            <h1>Hello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello WorldHello World</h1>
		</>
	);
};

userDashboard.getLayout = (page) => {
    return (
        <MainLayout>
            <DashboardLayout>{page}</DashboardLayout>
        </MainLayout>
    )
}

export default userDashboard;
