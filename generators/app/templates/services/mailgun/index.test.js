import nock from 'nock'
import * as mailgun from '.'
import { domainName } from '../../config'

it('sends mail', async () => {
  nock('https://api.mailgun.net')
    .filteringRequestBody(() => '*')
    .post('/v3/' + domainName + '/messages', '*')
    .reply(200, {
      'id': '<20170711110712.18440.DBA6FB69F25AD5BE@' + domainName + '.mailgun.org>',
      'message': 'Queued. Thank you.'
    })

  const response = await mailgun.sendMail({
    toMail: 'test',
    subject: 'Test',
    content: '<h1>Just Testing</h1>'
  })
  expect(response.message).toBe('Queued. Thank you.')
})
