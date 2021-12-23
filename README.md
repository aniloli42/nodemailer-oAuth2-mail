# Nodemailer with Oauth2

This script help to send the mail through gmail.

---

## Setup

### Setup Environment Variables:

```
CLIENT_ID
CLIENT_SECRET
REDIRECT_URI
REFRESH_TOKEN
USER_EMAIL
```

- CLIENT_ID & CLIENT_SECRET can obtain from https://console.cloud.google.com/apis/credentials
- REDIRECT_URI = "https://developers.google.com/oauthplayground"
- REFRESH_TOKEN = Can be obtain from REDIRECT_URI link.
- USER_EMAIL = Email of Sender

## Using Script

_Importing File:_

`import sendMail from './mailer.js'`

_Working with script_

`sendMail({from,to, subject, text, html})`

```
from: Show the sender info to Reciepent, like: Anil Oli ****<aniloli42@gmail.com>"
to: mail to sent email address
subject: Email Subject
text: Plain text of Message if html version not supported.
html: HTML version of message.
```
