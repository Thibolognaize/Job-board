const db = require("../models/db");
const { errors } = require("pg-promise");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

function generateAccesToken(user){
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {expiresIn: "10m" })
}

function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d" })
}

module.exports = {
    login2: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            // Recherche l'utilisateur par email
            const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
            
            // Vérification du mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!user || !isPasswordValid) {
                return res.redirect("/user/login?error=Email ou mot de passe incorrect");
            }

            // Création du token JWT sans les donnés sensitives
            const userData = {
                id: user.id,
                email: user.email,
                role: user.role,
                isAdmin: user.is_admin
            };
            
            const accessToken = generateAccesToken(userData);
            res.json({ accessToken: accessToken }); //
            
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            res.status(500).send("Erreur serveur");
        }
    },

};