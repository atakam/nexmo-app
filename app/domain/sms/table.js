const sql = require('../../../databasePool');

class SmsTable {
  static addSms(sms) {
    const {
      msisdn,
      messageto,
      messageId,
      smstext,
      smstype,
      keyword,
      apikey,
      messagetimestamp
     } = sms;

    return new Promise(async (resolve, reject) => {
      await sql`
      INSERT INTO messages(
        msisdn,
        messageto,
        messageId,
        smstext,
        smstype,
        keyword,
        apikey,
        messagetimestamp
      ) VALUES(
        ${msisdn},
        ${messageto},
        ${messageId},
        ${smstext},
        ${smstype},
        ${keyword},
        ${apikey},
        ${messagetimestamp})`;
      resolve({status: true})
    });
  }

  static getAllSms() {
    return new Promise(async (resolve, reject) => {
      const messages = await sql`
        SELECT
        msisdn,
        messageto,
        messageId,
        smstext,
        smstype,
        keyword,
        apikey,
        messagetimestamp
        FROM messages`;
      resolve({status: true, messages})
    });
  }

  static getAllSelfSms() {
    return new Promise(async (resolve, reject) => {
      const messages = await sql`
        SELECT
        msisdn,
        selfnumber,
        messageId,
        smstext,
        smstype,
        messagetimestamp
        FROM selfmessages`;
      resolve({status: true, messages})
    });
  }

  static addSelfSms(sms) {
    const {
      msisdn,
      selfnumber,
      messageId,
      smstext,
      smstype,
      messagetimestamp
     } = sms;

    return new Promise(async (resolve, reject) => {
      await sql`
      INSERT INTO selfmessages(
        msisdn,
        selfnumber,
        messageId,
        smstext,
        smstype,
        messagetimestamp
      ) VALUES(
        ${msisdn},
        ${selfnumber},
        ${messageId},
        ${smstext},
        ${smstype},
        ${messagetimestamp})`;
      resolve({status: true})
    });
  }
}

module.exports = SmsTable;
