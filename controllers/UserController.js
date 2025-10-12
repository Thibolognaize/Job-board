const db = require("../models/db")
const { errors } = require("pg-promise");
const bcrypt = require("bcrypt"); 

module.exports = {
    getUsers: (req, res) => {
        db.any("SELECT * FROM users;")
        .then(rows => {
            console.log(rows);
            res.json(rows);
        })
        .catch(error => {
            console.log(error);
        });
    },
    renderLogin: (req, res) => {
        res.render("users/login");
    },
    renderRegister: (req, res) => {
        res.render("users/register");
    },
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
    },
    register: async (req, res) => {
        try {
            const fname_input = req.body.fname;
            const lname_input = req.body.lname;
            const email_input = req.body.email;
            
            const saltRounds = 10; //Le nombre de tours de hachage
            const password_input = await bcrypt.hash(req.body.password,saltRounds);

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