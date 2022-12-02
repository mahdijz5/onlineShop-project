import * as Yup from "yup"

export const editUserSchema = Yup.object().shape({
    name : Yup.string().required("لطفا نام خود را وارد کنید.").max(35,"طول نام وارد شده بسیار زیاد است."),
    email : Yup.string().email("ایمیل وارد شده معتبر نمیباشد").required("لطفا ایمیل خود را وارد کنید."),
    address : Yup.string().trim(true).max(255,'شما نمیتوانید بیشتر از 255 کارکتر تایپ کنید'),
    phoneNumber : Yup.string().trim(true).max(11,'شماره موبایل نا معتبر است').min(11,'شماره موبایل نا معتبر است'),
})
