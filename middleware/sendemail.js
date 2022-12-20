const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
            auth: {
                user: "surya.exergy@gmail.com",
                pass:"dkmkngkjalmwpcvu " ,
            },
        });

        await transporter.sendMail({
           
            to: email,
            subject: subject,
            text: text,
            html:text

        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;