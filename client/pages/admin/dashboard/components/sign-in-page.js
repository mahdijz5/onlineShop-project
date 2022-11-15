
import AdminLayout from "../../../../components/Admin/AdminLayout";
import MainLayout from "../../../../components/Layouts/MainLayout";

function signInPage() {
  return (
    <>
        <iframe id="iframe" src="http://localhost:3000/user/sign-in"  className="w-100" style={{height : "95%"}}></iframe>
    </>
  )
}

signInPage.getLayout = (page) => {
	return (
		<MainLayout>
			<AdminLayout>{page}</AdminLayout>
		</MainLayout>
	);
};
export default signInPage