const initOptions = {
    // initialization options;
};

require('dotenv').config();

const pgp = require('pg-promise')(initOptions);

const db = pgp(process.env.DATABASE_URL);

module.exports = db;