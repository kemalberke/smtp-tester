import * as nodemailer from "nodemailer";
require('dotenv').config()
console.log('hello world')

const mailSettings = {
    host: process.env.HOST,
    port: +process.env.PORT!,
    secure: process.env.SECURE === 'true',
    user: process.env.USERMAIL,
    pass: process.env.PASS,
    bcc: process.env.BCC!,
    from: process.env.FROM,
    to: process.env.TO,
    subject: process.env.SUBJECT,
    html: process.env.HTML,
}
console.log(mailSettings)

const mailer = async () => {
    let transporter = nodemailer.createTransport({
        host: mailSettings.host,
        port: mailSettings.port,
        secure: mailSettings.secure, // true for 465, false for other ports
        auth: {
            user: mailSettings.user,
            pass: mailSettings.pass,
        },
        tls: {
            rejectUnauthorized: false
        },
    });

    try {
        await transporter.sendMail({
            bcc: [mailSettings.bcc],
            from: mailSettings.from,
            to: mailSettings.to,
            subject: mailSettings.subject,
            html: mailSettings.html
        });
        console.log('Mail Sent')
    } catch (e) {
        console.info('MAIL SEND ERROR', e?.toString())
        console.info(e)
    }
}


mailer().then(r => r)
