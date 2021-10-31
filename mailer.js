require("dotenv").config()
const nodemailer = require("nodemailer")
const { google } = require("googleapis")

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

async function sendMail({ from, to, subject, text, html }) {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    if (accessToken == null) throw new Error("Failed to get refresh token :(")

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
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
