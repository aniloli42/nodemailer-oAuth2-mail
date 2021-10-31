require('dotenv').config()
const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function sendMail({ to, subject, text, html }) {
	try {
		const accessToken = await oAuth2Client.getAccessToken()

		if (accessToken == null) throw new Error('Failed to get refresh token :(')

		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: 'donateblood.project@gmail.com',
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: accessToken
			}
		})

		const mailOptions = {
			from: '🩸Donate Blood Project <donateblood.project@gmail.com>',
			to,
			subject,
			text,
			html
		}

		const result = await transport.sendMail(mailOptions)
		return result
	} catch (error) {
		return error
	}
}

const sendConfirmationOTP = ({
	name,
	to,
	otp = 'Problem Occured',
	message = 'process'
}) => {
	name = name.split(' ')[0]
	mail = {
		to,
		subject: 'Password Reset OPT | Donate Blood',
		text: `
		Donate Blood
		-----------------------------------
	
		Hi ${name},

		Use the following OTP to complete your ${message}. OTP is valid for 5 minutes.
	
		OTP Code: ${otp}

		Ignore the mail, if you not try to ${message} in donateblood.com.
	
		Regards,
		Donate Blood Project Team`,
		html: `
		<table style="font-family:Helvetica,Arial,sans-serif;min-width:375px;width:575px;max-width:720px" border="0"><tr><td style="text-align:center"><h2 style="color:#00466a;font-size:1.8em;margin-bottom:5px">Donate Blood Project</h2></td></tr><tr><td><hr></td></tr><tr><td style="font-size:1.2em;padding:.8em 0">Hi ${name},</td></tr><tr><td style="font-size:1.1em;padding:.8em 0">Use the following OTP to complete your ${message}. OTP is valid for 5 minutes.</td></tr><tr><td><p style="margin:0 auto;width:max-content;padding:.6em 1em;border-radius:.3em;background-color:#00466a;color:#fff;font-size:1.6em">${otp}</p></td></tr><tr><td style="font-size:.98em;padding:.8em 0">Ignore the mail, if you do not try to ${message} in <a href="#" style="color:#00466a;text-decoration:none;font-weight:700">Donate Blood</a>.</td></tr><tr><td style="padding-top:2em">Regards,</td></tr><tr><td style="font-size:1.2em;font-weight:700;color:#00466a">Donate Blood Project Team</td></tr></table>
		`
	}
	sendEmail(mail)
}

const sendEmail = mail => {
	sendMail(mail)
		.then(result => console.log('Mail Sent', result))
		.catch(e => console.log(e))
}

module.exports = sendConfirmationOTP
