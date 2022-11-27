import MainLayout from "../../layouts/MainLayout";
import Meta from "../../components/Meta";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const userDashboard = () => {

	return (
		<>
			<Meta title="داشبورد ادمین" />
            
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
