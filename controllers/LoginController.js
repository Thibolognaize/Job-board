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
            const refreshToken = generateRefreshToken(userData);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,       // Empêche l'accès via JavaScript (sécurité)
                secure: true,         // Active en HTTPS seulement (désactive en développement si tu n'as pas de HTTPS)
                maxAge: 10 * 60 * 1000, // 10 minutes (même durée que le token)
                sameSite: 'strict'    // Protection cross-site request forgery
            });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
                });

            res.redirect("/")


            
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            res.status(500).send("Erreur serveur");
        }
    },

};