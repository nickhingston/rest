import { mailgunKey, defaultEmail, domainName } from '../../config'
import Mailgun from 'mailgun-js'
import Promise from 'bluebird'

var mailgun = Mailgun({apiKey: mailgunKey, domain: domainName})

export const sendMail = ({
  fromEmail = defaultEmail,
  toEmail,
  subject,
  content,
  contentType = 'text/html'
}) => {
  var data = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    text: content
  }
  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}
