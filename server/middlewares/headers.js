exports.setHeader = (req,res,next) => {
    // const origin = req.headers.origin;
    // if (origin) {
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }else {
    // }
    res.setHeader('Access-Control-Allow-Origin' ,'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods' , 'GET,POST,PUT,DELETE')
    res.setHeader('Access-Control-Allow-Headers' , 'Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
}