const db = require("../models/db");

module.exports = {
    get: (req, res) => {
        res.render("admin/index")
    } 
}