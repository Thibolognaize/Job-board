const db = require("../models/db");
const { errors } = require("pg-promise");
//const bcrypt = require("bcrypt"); 

module.exports = {
    register: async (req, res) => {
        try {
            const fname_input = req.body.fname;
            const lname_input = req.body.lname;
            const email_input = req.body.email;
            const password_input = req.body.password;

            const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email_input]);

            if (!user) {
                await db.none("INSERT INTO users VALUES (DEFAULT,$1,$2,$3,NULL,DEFAULT,NULL,$4,NULL,NULL,NULL,NULL,DEFAULT)",[fname_input,lname_input,email_input,password_input])
                return res.send("person added");
            }
            
            return res.send("this email is already used");

        } catch (error) {
            console.error("Erreur lors de l'inscription :", error); //<------------ message à changer
            res.status(500).send("Erreur serveur");
        }
    }
};
