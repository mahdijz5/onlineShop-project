import * as Yup from "yup"

export const userSchema = Yup.object().shape({
    name : Yup.string().required("لطفا نام خود را وارد کنید.").max(35,"طول نام وارد شده بسیار زیاد است."),
    email : Yup.string().email("ایمیل وارد شده معتبر نمیباشد").required("لطفا ایمیل خود را وارد کنید."),
    address : Yup.string().trim(true).max(255,'شما نمیتوانید بیشتر از 255 کارکتر تایپ کنید'),
    phoneNumber : Yup.string().trim(true).max(11,'شماره موبایل نا معتبر است'),
    password : Yup.string().trim().required("لطفا رمز خود را وارد کنید").min(5,"رمز وارد شده باید بیشتر از 5 کارکتر باشد.").max(255,"رمز وارد شده باید کمتر از 255 کارکتر باشد."),
    confirmPassword: Yup.string().required("لطفا تکرار رمز را وارد کنید.").oneOf([Yup.ref("password"),null] , "تکرار رمز عبور اشتباه است.")
})
