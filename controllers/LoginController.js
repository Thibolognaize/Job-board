const db = require("../models/db");
const { errors } = require("pg-promise");
const bcrypt = require("bcrypt"); 

module.exports = {
    login: async (req, res) => {
        try {
            const email_input = req.body.email;
            const password_input = req.body.password;

            // oneOrNone : soit l'objet soit null
            const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email_input]);

            if (!user) {
                return res.send("profile not found");
            }

            const isPasswordValid = await bcrypt.compare(password_input, user.password);
            
            if (isPasswordValid) {
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
