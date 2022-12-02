import MainLayout from "../../../layouts/MainLayout";
import Meta from "../../../components/Meta";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserData from "../../../components/dashboard/userData";

const userData = () => {

	return (
		<>
			<Meta title="سفارش ها" />
            <UserData/>
		</>
	);
};

userData.getLayout = (page) => {
    return (
        <MainLayout>
            <DashboardLayout>{page}</DashboardLayout>
        </MainLayout>
    )
}

export default userData;
