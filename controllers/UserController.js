const db = require("../models/db")
const { errors } = require("pg-promise");

module.exports = {
    get: (req, res) => {
        db.any("SELECT * FROM users;")
        .then(rows => {
            console.log(rows);
            res.json(rows);
        })
        .catch(error => {
            console.log(error);
        });
    }
};