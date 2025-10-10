const db = require("../models/db");
const { errors } = require("pg-promise");

module.exports = {
    get: (req, res) => {
        const advertisement = db.any("SELECT * FROM advertisements")
            .then((advertisements) => {
                res.render("advertisements", { advertisements });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des annonces :", error);
                res.status(500).send("Erreur serveur");
            });
    }
};
