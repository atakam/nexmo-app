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
    SmsTable.getAllSms()
    .then((messages) => {
        res.json({
            status: true,
            messages
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
                res.json({status: true});
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                res.json({status: false, error: responseData.messages});
            }
        }
    })
}

module.exports = router;