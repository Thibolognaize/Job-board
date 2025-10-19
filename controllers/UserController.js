const db = require("../models/db");
const { errors } = require("pg-promise");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

function generateAccesToken(user){
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {expiresIn: '10m'})
}

/* function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d" })
}
 */

module.exports = {
  renderLogin: (req, res) => {
    res.render("users/login", { error: req.query.error });
  },

    renderRegister: (req, res) => {
        res.render("users/register", { error: req.query.error });
    },

    renderProfil: async (req, res) => {
        try {
        const id = user.id;
        const user = await db.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
        console.log(user)

        res.render("/profil", { 
                user: user,
                success: req.query.success,
                error: req.query.error
            });
            
        } catch (error) {
            console.error("Erreur lors de la récupération du profil :", error);
            res.status(500).send("Erreur serveur");
        }
    },

  login: async (req, res) => {
    try {
      const email_input = req.body.email;
      const password_input = req.body.password;
      const remember = req.remember;

      // Recherche l'utilisateur par email
      const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [
        email_input,
      ]);
      if (!user) {
        return res.redirect(
          "/user/login?error=Email ou mot de passe incorrect"
        );
      }
    login: async (req, res) => {
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
                name : user.first_name + " " + user.last_name,
                role: user.role,
                isAdmin: user.is_admin
            };
            
            const accessToken = generateAccesToken(userData);
            //const refreshToken = generateRefreshToken(userData);
            
            //Création du Token pour acceder au Profil
            res.cookie('accessToken', accessToken, {
                httpOnly: true,       // Empêche l'accès via JavaScript (sécurité)
                secure: process.env.NODE_ENV === "production",  // Active en HTTPS seulement (désactive en développement)
                sameSite: 'strict',    // Protection cross-site request forgery
            });

            res.redirect("/")
            
        } 
        catch (error) {
            console.error("Erreur lors de la connexion :", error);
            res.status(500).send("Erreur serveur");
            }
        },

    
    register: async (req, res) => {
        try {
            const fname_input = req.body.fname;
            const lname_input = req.body.lname;
            const email_input = req.body.email;
            
            // Vérifie si l'email est déjà utilisé
            const existingUser = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email_input]);
            if (existingUser) {
                return res.redirect("/user/register?error=Cette adresse email est déjà utilisée");
            }

            // Hachage du mot de passe
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            
            // Insère le nouvel utilisateur dans la base de données
            await db.none(
                "INSERT INTO users VALUES (DEFAULT, $1, $2, $3, NULL, DEFAULT, DEFAULT, NULL, $4, NULL, NULL, NULL, NULL, DEFAULT)",
                [fname_input, lname_input, email_input, hashedPassword]
            );

            // Redirige vers la page de login après une inscription réussie
            return res.redirect("/user/login");

        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            res.status(500).send("Erreur serveur");
        }
    },

    logout: (req, res) => {
        res.clearCookie('accessToken');
        res.redirect('/');
    },

    update: async (req, res) => {
        res.send("text")
    },
    
    delete: async (req, res) => {
        res.send("text")
    },
    
    
};
