const Yup = require('yup')

exports.schema = Yup.object().shape({
    name : Yup.string().required("لطفا نام محصول را وارد کنید."),
    price : Yup.number().required("لطفا قیمت مورد نظر را وارد کنید"),
    thumbnail : Yup.object().shape({
        size : Yup.number().max(3000000,'شما نمیتوانید بیشتر از 3 مگابایت اپلود کنید.'),
        name : Yup.string().required('لطا عکس بند انگشتی را انتخاب کنید.'),
        mimetype : Yup.mixed().oneOf(['image/png','image/jpeg'],'فقط از پسوند png  و jpeg پشتیبانی میشود'),

    }),
    description : Yup.string(),
})
