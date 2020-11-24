const DEFAULT_PROPERTIES = {
    to: undefined,
    message: undefined,
    get timestamp() {
      return new Date()
    }
}

class Sms {
  constructor({
    to,
    message,
    timestamp
  } = {}) {
    this.to = to || DEFAULT_PROPERTIES.to;
    this.message = message || DEFAULT_PROPERTIES.message;
    this.timestamp = timestamp || DEFAULT_PROPERTIES.timestamp;
  }
}

module.exports = Sms;