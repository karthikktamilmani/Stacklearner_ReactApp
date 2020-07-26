const nodemailer = require("nodemailer");

const sendMail = (to, subject, html) => {

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'stacklearner5709@gmail.com',
			pass: 'group17@web'
		}
	});

	let mailOptions = {
		from: 'stacklearner5709@gmail.com',
		to: to,
		subject: subject,
		html: html
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});
}

module.exports=sendMail;
