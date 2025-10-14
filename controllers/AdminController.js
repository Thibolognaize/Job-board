const db = require("../models/db");

module.exports = {
    get: (req, res) => {
        res.render("admin/index");
    },
    // Faire un premer crud pour les users
    getUsers: (req, res) => {
        res.render("admin/users");
    },
    getCompanies: (req, res) => {
        res.render("admin/companies");
    },
    getAdvertisements: (req, res) => {
        res.render("admin/advertisements");
    },
    getKeywords: (req, res) => {
        res.render("admin/keywords");
    },
};
