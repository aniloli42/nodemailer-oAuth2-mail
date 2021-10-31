# Mailer Script

This is the script where we can send the mail by using this codes.

---

## Setup
#### Setup Environment Variables:
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

*Importing File:*

```import sendMail from './mailer.js'```

*Working with script*

```sendMail({from,to, subject, text, html})```

```
from: Show the sender info to Reciepent, like: Anil Oli ****<aniloli42@gmail.ocm>"
to: mail to sent email address
subject: Email Subject
text: Plain text of Message if html version not supported.
html: HTML version of message.
```