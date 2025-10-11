const db = require("../models/db");
const { errors } = require("pg-promise");
//const bcrypt = require("bcrypt"); 

module.exports = {
    register: async (req, res) => {
        try {
            const email_input = req.body.email;
            const password_input = req.body.password;

            console.log(email_input , "--", password_input);

            // oneOrNone : soit l'objet soit null
            const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email_input]);

            if (!user) {
                return res.send("profile not found");
            }

            //acces au donné en pbjet c'est comme ça du coup c'est permis
            if (user.password === password_input) {
                return res.send("login successful");
            } else {
                return res.send("password incorrect");
            }

        } catch (error) {
            console.error("Erreur lors de la vérification du profil :", error);
            res.status(500).send("Erreur serveur");
        }
    }
};
