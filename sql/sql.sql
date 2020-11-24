CREATE TABLE IF NOT EXISTS messages(
  msisdn           VARCHAR(64),
  messageto        VARCHAR(64),
  messageId        VARCHAR(64) PRIMARY KEY,
  smstext          TEXT,
  smstype          VARCHAR(64),
  keyword          VARCHAR(255),
  apikey           VARCHAR(64),
  messagetimestamp VARCHAR
);

CREATE TABLE IF NOT EXISTS selfmessages(
  msisdn           VARCHAR(64),
  selfnumber        VARCHAR(64),
  messageId        VARCHAR(64) PRIMARY KEY,
  smstext          TEXT,
  smstype          VARCHAR(64),
  messagetimestamp VARCHAR
);