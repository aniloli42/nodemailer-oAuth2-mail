const nodemailer = require("nodemailer")

async function sendMail({ from, to, subject, text, html }) {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    })

    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    }

    const result = await transport.sendMail(mailOptions)
    return result
  } catch (error) {
    return error
  }
}

module.exports = sendMail
