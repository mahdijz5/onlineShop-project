const Yup = require('yup')

exports.schema = Yup.object().shape({
    text : Yup.string().required("لطفا بازخورد خود را از این محصول وارد کنید").max(1000,"ّییشتر از هزار کارکتر نمیتوانید بنویسید"),
    rate : Yup.number().required("لطفا به این محصول امتیاز دهید").min(1,"لطفا به این محصول امتیاز دهید")
})
