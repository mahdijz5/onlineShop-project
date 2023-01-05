const nodemailer = require('nodemailer')
// const smtpTransport = require('nodemaile')
exports.sendEmail = (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: 'localhost:3001',
        port: 465, // Postfix uses port 25
        service: 'gmail',
        secure :"true",
        auth: {
            type: "OAuth2",
            user: "mahdi.jz.v@gmail.com",
            pass: "az09az09mjzZ$",
            accessToken: "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",
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    var message = {
        from: 'noreply@gmail.com',
        to: 'king.ferris.king@gmail.com',
        subject: 'Confirm Email',
        text: 'Please confirm your email',
        html: '<p>Please confirm your email</p>'
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            next(error)
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
    res.json("email sent")
}