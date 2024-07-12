const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "yashradadiya013@gmail.com",
        pass: "msuy pjxx zhbt pcrf",
    }
})

module.exports = {transporter}