const pgp = require('pg-promise')();
const conn = "postgresql://admin:prrrout@localhost:5432/jobboard_db";

const db = pgp(conn);

module.exports = db;