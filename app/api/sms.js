const { Router } = require('express');
const SmsTable = require('../domain/sms/table');
const SMS = require('../domain/sms');

const router = new Router();

router.post('/new', (req, res, next) => {
    let {
        to,
        message
     } = req.body;

    const sms = new SMS({
        to,
        message
    });

    console.log("SMS", sms);

    sendSMS({sms, res, next});
});

router.get('/', (req, res, next) => {
    console.log('Get all messages');
    let respObject = {};
    SmsTable.getAllSms()
    .then((messages) => {
        respObject.remote = messages;
        return SmsTable.getAllSelfSms();
    })
    .then((messages) => {
        respObject.self = messages
        res.json({
            status: true,
            messages: respObject
        })
    })
    .catch(error => next(error));
});

function sendSMS({sms, res, next}) {
    const Vonage = require('@vonage/server-sdk')
    const vonage = new Vonage({
        apiKey: '66d8e5af',
        apiSecret: '3aab08e28dbeaedd'
    })
    const from = sms.to.startsWith('33') ? '33644632576' : '12262980556';
    const to = sms.to
    const text = sms.message

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
                const smsObj = {
                    msisdn: to,
                    selfnumber: from,
                    messageId: responseData.messages[0]['message-id'],
                    smstext: text,
                    smstype: 'text',
                    messagetimestamp: ''
                };
                SmsTable.addSelfSms(smsObj)
                .then(() => {
                    res.json({state: true, responseData});
                })
                .catch((error) => next(error))
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                res.json({state: false, error: responseData.messages});
            }
        }
    })
}

module.exports = router;