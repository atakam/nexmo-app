const postgres = require('postgres');
const sql = postgres('postgres://ajcdnwzk:E0RvDUeeDQ3bdmjcg5wbeeSoOidjCHpT@suleiman.db.elephantsql.com:5432/ajcdnwzk');

module.exports = sql;