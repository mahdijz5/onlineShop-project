import MainLayout from "../../components/MainLayout";
import Meta from "../../components/Meta";
import DashLayout from "../../components/userDash/DashLayout";

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
            <DashLayout>{page}</DashLayout>
        </MainLayout>
    )
}

export default userDashboard;
