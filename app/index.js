const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const smsRouter = require('./api/sms');
const SmsTable = require('./domain/sms/table');

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/sms', smsRouter);

app
  .route('/webhooks/inbound-sms')
  .get(handleInboundSms)
  .post(handleInboundSms)

function handleInboundSms(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(JSON.stringify(params))
  const sms = {
    msisdn: params['msisdn'],
    messageto: params['to'],
    messageId: params['messageId'],
    smstext: params['text'],
    smstype: params['type'],
    keyword: params['keyword'],
    apikey: params['api-key'],
    messagetimestamp: params['message-timestamp']
  }
  SmsTable.addSms(sms)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    error ? console.error(error) : console.error('Unkown Error');
  })
  response.status(204).send()
}

module.exports = app;