import MainLayout from "../../../layouts/MainLayout";
import Meta from "../../../components/Meta";
import AdminLayout from "../../../layouts/AdminLayout";
import { Box } from "@mui/material";

const userDashboard = () => {
	return (
		<>
            <Box>
                <h1>12</h1>
            </Box>
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
