const db = require("../models/db");
const { errors } = require("pg-promise");

module.exports = {
    get: (req, res) => {
        const advertisement = db.any("SELECT * FROM advertisements")
            .then((advertisements) => {
                res.render("advertisements/list", { advertisements });
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des annonces :", error);
                res.status(500).send("Erreur serveur");
            });
    },
    getCreateAdvertisement: (req, res) => {
        res.render("advertisements/create", );
    },
    // Submission du formulaire de creation d
    post: (req, res) => {
        const { title, description } = req.body;
        db.none("INSERT INTO advertisements(title, description) VALUES($1, $2)", [title, description])
            .then(() => {
                // Envoie une réponse avec un message de succès
                res.render("advertisements/create", {
                    title: "",
                    success: true,
                    message: "Annonce créée avec succès !",
                    link: "/advertisements" // Lien pour retourner à la liste
                });
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout de l'annonce :", error);
                res.render("advertisements/create", {
                    title: title,
                    error: true,
                    message: "Erreur lors de la création de l'annonce.",
                    link: "/advertisements"
                });
            });
    }

};
