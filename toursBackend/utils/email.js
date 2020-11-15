const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
   // using mailtrap host

    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true,
        auth: {
            user: 'ragdabakr5@gmail.com',
            pass: 'regorego1'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
  // if using gmail Activate in gmail address (less secure app ) option

  // 2) Define the email options
  const mailOptions = {
    from: 'regoTrip',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
    };

    console.log('mailOptions',mailOptions);

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;