import { Avatar, Button, Link, setRef, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { General } from '../../../context/context';
import { toastNotif } from '../../../helpers/tools';
import { editUserData } from '../../../services/user';
import { editUserSchema } from '../../../validation/editUser';
import TextFieldWrapper from '../../ui/TextFieldWrapper';


const UserData = () => {
    const { user,setRefresh } = useContext(General);
    const [getImage, setImage] = useState([])

    const onSubmitEdit = (values) => {
        const data = new FormData()
        data.set("name", values.name)
        data.set("email", values.email)
        data.set("address", values.address)
        data.set("phoneNumber", values.phoneNumber)
        getImage.map((file) => {
			data.append("image" , file)
		})
        editUserData(data, user._id, (response, err) => {
            if (err) {
                if (err.response.data.message) {
                    toastNotif(err.response.data.message, err.response.status, 0);
                }
            } else {
                toastNotif(response.data.message, response.status, 0);
                setRefresh(p => !p)

            }
        })

    }


return (
    <Stack display="flex" alignItems="center">
        <label htmlFor='profile'>
            <Avatar sx={{ width: "90px", height: "90px" ,cursor :"pointer"}} src={`http://localhost:3001/uploads/profiles/${user.profileImg}`} />
        </label>
        <input name="profile" type="file" id="profile" hidden onChange={(e) => {
            setImage([e.target.files[0]])
        }} />
        {user.name != undefined ? (
            <Formik
                initialValues={{
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                }}
                validationSchema={editUserSchema}
                onSubmit={async(values) => {
                    onSubmitEdit(values)
                }}
            >
                <Form
                    method="post"
                    action='#'
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} padding="10px">

                        <TextFieldWrapper name="name" label="نام کاربری" variant="outlined"
                            sx={{ m: 1, width: { xs: "100%", md: "31%" } }} />
                        <TextFieldWrapper label="ایمیل" name="email" variant="outlined" sx={{ m: 1, width: { xs: "100%", md: "31%" } }} />
                        <TextFieldWrapper label="شماره موبایل" name="phoneNumber" variant="outlined" sx={{ m: 1, width: { xs: "100%", md: "31%" } }} />
                        <TextFieldWrapper label="آدرس" name="address" variant="standard" sx={{ m: 1, width: "100%" }} />
                    </Box>
                    <Button sx={{ marginTop: "15px" }} type="submit"   variant="contained" >تغییر</Button>
                </Form>
            </Formik>
        ) : null}
    </Stack >
);
}


export default UserData;